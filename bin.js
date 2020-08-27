#!/usr/bin/env node

/*

  88""Yb 888888    db    8b    d8          .dP"Y8 88""Yb 88     88 888888 888888 888888 88""Yb
  88__dP 88__     dPYb   88b  d88 ________ `Ybo." 88__dP 88     88   88     88   88__   88__dP
  88""Yb 88""    dP__Yb  88YbdP88 """""""" o.`Y8b 88"""  88  .o 88   88     88   88""   88"Yb
  88oodP 888888 dP""""Yb 88 YY 88          8bodP' 88     88ood8 88   88     88   888888 88  Yb


  cli tool that encrypts a file & splits it into chunks, also re-assembles chunks using a password

  prototyping... with demo.zip test zip folder

  node bin.js --export demo.zip --password pass
  node bin.js --import ./demo.zip_output --password pass

  make sure the reconstructed zip folder successfully extracts or things are deffinitely broken!

  @m-onz

*/

var argv = require('minimist')(process.argv.slice(2))
var crypto = require('crypto')
var split = require('split-buffer')
var mkdirp = require('mkdirp')
var assert = require('assert')
var fs = require('fs')

var instructions = 'beam-splitter --export ./<>.zip --password <> OR beam-splitter --import ./folder --password <>'

var ALLOWED_FLAGS = [ 'import', 'export', 'password', '_' ]

var password = false
if(argv.hasOwnProperty('password')) password = argv.password
if (!password) throw Error ('needs a password eg --password pass123')

var IMPORT = false
var EXPORT = false
var mode = 'IMPORT'

if (argv.hasOwnProperty('import')) {
  IMPORT = argv.import
  mode = 'IMPORT'
}

if (argv.hasOwnProperty('export')) {
  EXPORT = argv.export
  mode = 'EXPORT'
}

if (IMPORT && EXPORT) {
  throw Error('you cannot import and export at the same time!')
}

Object.keys(argv).forEach(function (key) {
  if (!ALLOWED_FLAGS.includes(key)) throw Error('I do not recognize... '+key)
})

function hash (thing) {
  var hash = crypto.createHash('sha256')
  hash.update(thing)
  return hash.digest('hex')
}

switch(mode) {
  case 'EXPORT':
    var file = Buffer.from(fs.readFileSync(EXPORT))
    console.log('input file: ', EXPORT, 'file hash', hash(file))
    var chunks = split(file, 1024 * 1024) // 1MB chunks
    mkdirp.sync(EXPORT+'_output')
    chunks.forEach(function (chunk, index) {
      assert.ok(Buffer.isBuffer(chunk))
      fs.writeFileSync(
        EXPORT+
        '_output/'+
        hash(chunk)+
        '_'+index,
        chunk, {
          encoding: null
        })
    })
  break;
  case 'IMPORT':
    var dir = fs.readdirSync(IMPORT)
    var chunks_length = dir.length
    var reconstruct = new Array(chunks_length)
    fs.readdirSync(IMPORT).forEach(function (path) {
      var index = parseInt(path.split('_')[1])
      reconstruct[index] = fs.readFileSync(IMPORT+'/'+path)
    })
    var reconstructed = Buffer.concat(reconstruct)
    fs.writeFileSync(
      IMPORT+'_reconstructed.zip', // hardcoded extension, I am testing a zip folder
      reconstructed, {
        encoding: null
      })
  break;
  default:
    throw Error('you must either import or export')
}

// ---- ---- ---- ---- ----
