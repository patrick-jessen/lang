let astDefs = require('../parser/types')

function generateBlock(ast) {
    let src = ''

    for(let i in ast) {
        src += generateStatement(ast[i])
    }
    return src
}

function generateList(ast) {
    let src = ''
    
    for(let i in ast) {
        if(i != 0) src += ','
        src += generateStatement(ast[i])
    }
    return src
}

function generateStatement(ast) {
    switch(ast.type) {
        case astDefs.STRING:
            return `"${ast.value}"`
        case astDefs.FUNCTION_CALL:
            return generateFunctionCall(ast)
        default:
            console.warn('Invalid statement', ast)
    }
}

function generateFunctionCall(ast) {
    let name = ast.name
    switch(name) {
        case 'print':
            name = 'console.log'
            break
    }

    return `${name}(${generateList(ast.args)})`
}

module.exports = function(ast) {
    return generateBlock(ast)
}