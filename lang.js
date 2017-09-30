var lex = require('./lexer/lex')
var parse = require('./parser/parse')
let generate = require('./generator/generate')

var fs = require('fs');
let source = fs.readFileSync('./source.j','utf8')

let tokens = lex(source)
let ast = parse(tokens)
let src = generate(ast)
eval(src)

