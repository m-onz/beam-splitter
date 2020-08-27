/*

  88""Yb 888888    db    8b    d8          .dP"Y8 88""Yb 88     88 888888 888888 888888 88""Yb
  88__dP 88__     dPYb   88b  d88 ________ `Ybo." 88__dP 88     88   88     88   88__   88__dP
  88""Yb 88""    dP__Yb  88YbdP88 """""""" o.`Y8b 88"""  88  .o 88   88     88   88""   88"Yb
  88oodP 888888 dP""""Yb 88 YY 88          8bodP' 88     88ood8 88   88     88   888888 88  Yb


  cli tool that encrypts a file & splits it into chunks, also re-assembles chunks using a password

  @m-onz

*/

var argv = require('minimist')(process.argv.slice(2))

var instructions = 'beam-splitter --export ./<>.zip --password <> OR beam-splitter --import ./folder --password <>'

console.log('... ', argv)

var ALLOWED_FLAGS = [ 'import', 'export', 'password', '_' ]

var password = false
if(argv.hasOwnProperty('password')) password = argv.password
if (!password) throw Error ('needs a password eg --password pass123')

var IMPORT = false
var EXPORT = false

if (argv.hasOwnProperty('import')) IMPORT = argv.import
if (argv.hasOwnProperty('export')) EXPORT = argv.export

if (IMPORT && EXPORT) {
  throw Error('you cannot import and export at the same time!')
}

Object.keys(argv).forEach(function (key) {
  if (!ALLOWED_FLAGS.includes(key)) throw Error('I do not recognize... '+key)
})
