// Token fractions
let TYPE = String.raw`string|int|float`
let IDENTIFIER = String.raw`[a-zA-Z][a-zA-Z0-9_]*`

// Tokens
let WHITE_SPACE = String.raw`^\s+`
let VAR_DECL = String.raw`^var (${IDENTIFIER})( = (.*))?$`
let FUNCTION_CALL = String.raw`^(${IDENTIFIER})\((.*)\)$`

let source = `
print("msg")
`
function match(src, regs) {
    for(let i in regs) {
        let m = src.match(new RegExp(regs[i], 'm'))
        if(m) {
            return {
                regex: regs[i],
                match: m
            }
        }
    }
    return false
}

function parseBlock(src) {
    let iter = 0

    while(iter < src.length) {
        iter += parseStatement(src.substring(iter))
    }
}

function parseStatement(src) {
    let regs = [WHITE_SPACE, VAR_DECL, FUNCTION_CALL]

    let m = match(src, regs)

    switch(m.regex) {
        case WHITE_SPACE:
            return parseWhiteSpace(src, m.match)
        case VAR_DECL:
            return parseVarDecl(src, m.match)
        case FUNCTION_CALL:
            return parseFunctionCall(src, m.match)
        default:
            console.warn('unknown statement:', src)
            return 1
    }
}

function parseWhiteSpace(src, match) {
    // Do not do anything
    return match.length
}

function parseVarDecl(src, match) {
    let name = match[1]
    let assign
    if(match.length > 3)
        assign = match[3]

    console.log('VarDecl:', name, (assign ? assign : ''))

    return match[0].length
}

function parseFunctionCall(src, match) {
    let name = match[1]
    let args = []
    if(match[2].length > 0)
        args = match[2].split(', ')

    console.log('FunctionCall:', name, args)

    return match[0].length
}


module.exports = {
    test() {
        parseBlock(source)
    }
}