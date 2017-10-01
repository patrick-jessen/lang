let lex = require('./lexer/lex')
let parse = require('./parser/parse')
let optimize = require('./optimizer/optimize')
let generate = require('./generator/generate')

let showSource = false
let showAST = false
process.argv.forEach(function (val) {
    switch(val) {
        case '-s':
            showSource = true
            break
        case '-a':
            showAST = true
            break
    }
});

// Load source
let fs = require('fs');
let source = fs.readFileSync('./source.j','utf8')

// Compile
let tokens = lex(source)
let ast = parse(tokens)
ast = optimize(ast)
let src = generate(ast)
if(showSource) {
    console.log(src)
    return
}
if(showAST) {
    console.log(ast)
    return
}

// Run
eval(src)

