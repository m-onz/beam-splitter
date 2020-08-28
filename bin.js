#!/usr/bin/env node

var instructions = `

  88""Yb 888888    db    8b    d8          .dP"Y8 88""Yb 88     88 888888 888888 888888 88""Yb
  88__dP 88__     dPYb   88b  d88 ________ \`Ybo." 88__dP 88     88   88     88   88__   88__dP
  88""Yb 88""    dP__Yb  88YbdP88 """""""" o.\`Y8b 88"""  88  .o 88   88     88   88""   88"Yb
  88oodP 888888 dP""""Yb 88 YY 88          8bodP' 88     88ood8 88   88     88   888888 88  Yb


  cli tool that encrypts a file & splits it into chunks, also re-assembles chunks using a password

  beam-splitter --export demo.zip --password pass
  beam-splitter --import ./demo.zip_output --password pass

  @m-onz

`

var argv = require('minimist')(process.argv.slice(2))
var split = require('split-buffer')
var crypto = require('crypto')
var mkdirp = require('mkdirp')
var assert = require('assert')
var path = require('path')
var fs = require('fs')

var ALGORITHM = 'blowfish'
var ALLOWED_FLAGS = [ 'import', 'export', 'password', '_' ]
var PASSWORD = false
var IMPORT = false
var EXPORT = false

var mode = 'IMPORT'
if (argv.hasOwnProperty('password')) PASSWORD = argv.password

if (argv.hasOwnProperty('import')) {
  IMPORT = argv.import
  mode = 'IMPORT'
} else if (argv.hasOwnProperty('export')) {
  EXPORT = argv.export
  mode = 'EXPORT'
} else {
  return console.log(instructions)
}
if (!PASSWORD) throw Error ('needs a password eg --password pass123')
if (IMPORT && EXPORT) {
  throw Error('you cannot import and export at the same time!')
}

Object.keys(argv).forEach(function (key) {
  if (!ALLOWED_FLAGS.includes(key)) throw Error('I do not recognize... '+key)
})

function hashSHA256 (thing) {
  var hash = crypto.createHash('sha256')
  hash.update(thing)
  return hash.digest('hex')
}

switch(mode) {
  case 'EXPORT':
    console.log('beam-splitter :: exporting ', EXPORT)
    var cipher = crypto.createCipher(ALGORITHM, PASSWORD)
    var input = fs.createReadStream(path.normalize(EXPORT))
    var temp_path = path.join(process.cwd(), 'temp.enc')
    input.pipe(cipher).pipe(fs.createWriteStream(temp_path))
      .on('finish', function () {
        var file = Buffer.from(fs.readFileSync(temp_path))
        fs.unlinkSync(temp_path)
        console.log('input file: ', EXPORT, 'file hash', hashSHA256(file))
        var chunks = split(file, 1024 * 1024) // 1MB chunks
        mkdirp.sync(EXPORT+'_output')
        chunks.forEach(function (chunk, index) {
          assert.ok(Buffer.isBuffer(chunk))
          console.log('<chunk> ', hashSHA256(chunk))
          // will create seemingly broken png images
          var outpath = path.join(EXPORT+'_output/', hashSHA256(chunk)+'_'+index+'_.png')
          fs.writeFileSync(
            path.normalize(outpath),
            chunk, {
              encoding: null
            })
        })
    })
  break;
  case 'IMPORT':
    console.log('beam-splitter :: importing ', IMPORT)
    var extension = IMPORT.split('.')
    extension = extension[extension.length-1].split('_output')[0]
    var decipher = crypto.createDecipher(ALGORITHM, PASSWORD);
    var dir = fs.readdirSync(path.normalize(IMPORT))
    var chunks_length = dir.length
    var reconstruct = new Array(chunks_length)
    dir.forEach(function (_path) {
      var index = parseInt(_path.split('_')[1])
      var hash = _path.split('_')[0]
      var file = fs.readFileSync(path.normalize(path.join(IMPORT, _path)))
      console.log('<chunk> ', hash)
      if (hashSHA256(file) === hash) reconstruct[index] = file
        else throw Error('data integrity check failed')
    })
    var reconstructed = Buffer.concat(reconstruct)
    console.log(reconstructed.length, '........')
    var temp_path = path.normalize(path.join(process.cwd(), 'temp.dec'))
    fs.writeFileSync(
      temp_path,
      reconstructed, {
        encoding: null
      })
    var decrypted = fs.createReadStream(temp_path)
    var reconstructed = path.normalize(path.join(process.cwd(), 'reconstructed.'+extension))
    decrypted.pipe(decipher).pipe(fs.createWriteStream(reconstructed))
      .on('finish', function () {
        fs.unlinkSync(temp_path)
      })
  break;
  default:
    throw Error('you must either import or export')
}

// ---- ---- ---- ---- ---- end of file.
