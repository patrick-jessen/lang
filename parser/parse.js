let astDefs = require('./types')
let t = require('../lexer/tokens').tokens

function addToAST(ast, obj) {
    ast.push(obj)
}

function parseBlock(tokens, ast) {
    let iter = 0

    while(iter < tokens.length) {
        iter += parseStatement(tokens.slice(iter), ast)
    }
}

function parseStatement(tokens, ast) {
    let n = 0
    n = parseLineBreak(tokens, ast)
    if(n > 0) return n
    n = parseFunctionCall(tokens, ast)
    if(n > 0) return n
    n = parseComma(tokens, ast)
    if(n > 0) return n
    n = parseString(tokens, ast)
    if(n > 0) return n
    n = parseVarDecl(tokens, ast)
    if(n > 0) return n
    n = parseVarRef(tokens, ast)
    if(n > 0) return n
    n = parseFail(tokens, ast)
    if(n > 0) return n
    n = parseCurlyBlock(tokens, ast)
    if(n > 0) return n
    n = parseWhiteSpace(tokens, ast)
    if(n > 0) return n

    console.warn('PARSER: unknown statement:', tokens)
    return 1
}

function parseWhiteSpace(tokens, ast) {
    if(tokens[0].token == t.WHITE_SPACE) return 1
}

function parseCurlyBlock(tokens, ast) {
    if(tokens.length < 2) return
    if(tokens[0].token != t.LEFT_CURL) return

    // Look for ending curl
    let c = 1
    let i = 1
    while(c > 0) {
        if(tokens.length < i+1) return

        if(tokens[i].token == t.LEFT_CURL) c++
        else if(tokens[i].token == t.RIGHT_CURL) c--
        i++

        if(i > 100) {
            console.warn('Unmatched curl')
            return
        }
    }

    let astObj = {
        type: astDefs.BLOCK,
        body: []
    }

    let body = tokens.slice(1, i-1)
    parseBlock(body, astObj.body)

    addToAST(ast, astObj)
    return i
}

function parseFail(tokens, ast) {
    if(tokens[0].token != t.MINUS) return

    let astObj = {
        type: astDefs.FAIL,
        body: []
    }

    let n = parseStatement(tokens.slice(1), astObj.body)
    addToAST(ast, astObj)

    return n+1
}

function parseVarRef(tokens, ast) {
    if(tokens[0].token != t.IDENTIFIER) return

    addToAST(ast, {
        type: astDefs.VAR_REF,
        name: tokens[0].value
    })
    return 1
}

function parseVarDecl(tokens, ast) {
    if(tokens.length < 4) return
    if(tokens[0].token != t.KEY_WORD && tokens[0].value != 'var') return
    if(tokens[1].token != t.IDENTIFIER) return
    if(tokens[2].token != t.EQUALS) return

    let astObj = {
        type: astDefs.VAR_DECL,
        name: tokens[1].value,
        rhs: []
    }

    let rhs = tokens.slice(3)
    let n = parseStatement(rhs, astObj.rhs)

    addToAST(ast, astObj)

    return 3 + n
}

function parseString(tokens, ast) {
    if(tokens[0].token != t.STRING) return

    addToAST(ast, {
        type: astDefs.STRING,
        value: tokens[0].value
    })
    return 1
}

function parseComma(tokens, ast) {
    if(tokens[0].token == t.COMMA) return 1
}

function parseLineBreak(tokens, ast) {
    if(tokens[0].token == t.LINE_BREAK) return 1
}

function parseFunctionCall(tokens, ast) {
    if(tokens.length < 3) return
    if(tokens[0].token != t.IDENTIFIER) return
    if(tokens[1].token != t.LEFT_PAREN) return
    
    // Look for ending parenthesis
    let c = 1
    let i = 2
    while(c > 0) {
        if(tokens.length < i+1) return

        if(tokens[i].token == t.LEFT_PAREN) c++
        else if(tokens[i].token == t.RIGHT_PAREN) c--
        i++

        if(i > 100) {
            console.warn('Unmatched parenthesis')
            return
        }

    }

    let fnName = tokens[0].value
    let astObj = {
        type: astDefs.FUNCTION_CALL,
        name: fnName,
        args: []
    }

    // Call has arguments
    if(i > 3) {
        let args = tokens.slice(2, i-1)
        parseBlock(args, astObj.args)
    }

    addToAST(ast, astObj)
    
    // Consume optional linebreak
    if(tokens.length < i && tokens[i].token == t.LINE_BREAK)
        i++

    return i
}

module.exports = function(tokens) {
    let ast = []
    parseBlock(tokens, ast)
    return ast
}