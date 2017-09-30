var t = require('./tokens')
console.log(t)

// Tokens
let KEY_WORD = String.raw`^var`
let IDENTIFIER = String.raw`^[a-zA-Z][a-zA-Z0-9_]*`
let LEFT_PAREN = String.raw`^\(`
let RIGHT_PAREN = String.raw`^\)`
let COMMA = String.raw`^,`

// Literals
let STRING = String.raw`^'[^']*'`
let FLOAT = String.raw`^[0-9]+.[0-9]+`
let INTEGER = String.raw`^[0-9]+`

// Operators
let EQUALS = String.raw`^=`

// White space
let LINE_BREAK = String.raw`^\n`
let WHITE_SPACE = String.raw`^\s+`

// Comments
let COMMENT = String.raw`^\/\/.*\n`
let BLOCK_COMMENT = String.raw`^\/\*[\s\S]*\*\/`

let tokens = []

let source = `
print(12.0)
`
function match(src, regs) {
    for(let i in regs) {
        let m = src.match(new RegExp(regs[i]))
        if(m) {
            return {
                regex: regs[i],
                match: m
            }
        }
    }
    return false
}

// Start the lexing
function startLex(src) {
    let iter = 0

    while(iter < src.length) {
        iter += lex(src.substring(iter))
    }
    console.log(tokens)
}

function lex(src) {
    let regs = [
        // Comments
        COMMENT, BLOCK_COMMENT, 
        // White space
        LINE_BREAK, WHITE_SPACE, 
        // Symbols
        LEFT_PAREN, RIGHT_PAREN, COMMA,
        // Literals
        STRING, FLOAT, INTEGER,
        // Keywords / names
        KEY_WORD, IDENTIFIER, 
        // Operators
        EQUALS]

    let m = match(src, regs)

    switch(m.regex) {
        case COMMENT:
            break
        case BLOCK_COMMENT:
            break
        case LINE_BREAK:
            if(tokens.length > 0 && tokens[tokens.length-1].token != 'line_break') {
                tokens.push({
                    token: 'line_break'
                })
            }
            break
        case WHITE_SPACE:
            break
        case LEFT_PAREN:
            tokens.push({
                token: 'left_paren'
            })
            break
        case RIGHT_PAREN:
            tokens.push({
                token: 'right_paren'
            })
            break
        case STRING:
            tokens.push({
                token: 'string',
                value: m.match[0]
            })
            break
        case FLOAT:
            tokens.push({
                token: 'float',
                value: m.match[0]
            })
            break
        case INTEGER:
            tokens.push({
                token: 'integer',
                value: m.match[0]
            })
            break
        case KEY_WORD:
            tokens.push({
                token: 'key_word',
                value: m.match[0]
            })
            break
        case IDENTIFIER:
            tokens.push({
                token: 'identifier',
                value: m.match[0]
            })
            break
        case EQUALS:
            tokens.push({
                token: 'equals'
            })
            break
        case COMMA:
            tokens.push({
                token: 'comma'
            })
            break
        default:
            console.warn('unknown statement:', src)
            return 1
    }

    return m.match[0].length
}

module.exports = {
    test() {
        startLex(source)
    }
}