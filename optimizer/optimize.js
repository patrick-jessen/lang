let astDefs = require('../parser/types')

function findAst(ast, type, value) {
    for(let i = 0; i < ast.length; i++) {
        let a = ast[i]
        if(a.type == type) {
            if(value) {
                if(a.value == value)
                    return {ast: a, index: i}
                return null
            }
                
            return {ast: a, index: i}
        }
    }
    return null
}

function optimizeFailRetry(ast) {
    let fail = findAst(ast, astDefs.FAIL)
    if(fail == null) return ast
    
    // look for retry (may be wrapped in block)
    let body = fail.ast.body
    if(body.length == 1 && body[0].type == astDefs.BLOCK)
        body = body[0].body
    let retry = findAst(body, astDefs.RETRY)
    if(retry == null) return ast

    // now optimize
    // TODO
    
    return ast
}


module.exports = function(ast) {

    ast = optimizeFailRetry(ast)

    return ast
}