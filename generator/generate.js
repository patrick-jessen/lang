let astDefs = require('../parser/types')
let lib = require('./library/lib')

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
        case astDefs.INTEGER:
            return `${ast.value}`
        case astDefs.FUNCTION_CALL:
            return generateFunctionCall(ast)
        case astDefs.VAR_DECL:
            return generateVarDecl(ast)
        case astDefs.VAR_REF:
            return generateVarRef(ast)
        case astDefs.FAIL: 
            return generateFail(ast)
        case astDefs.BLOCK:
            return generateCurlyBlock(ast)
        case astDefs.STATE_CHECK:
            return generateStateCheck(ast)
        default:
            console.warn('GEN: Invalid statement', ast)
    }
}

function generateStateCheck(ast) {
    let cond = ''
    switch(ast.check) {
        case 'fail':
            cond = 'errorState'
            break
        case '<':
            cond = 'compState == "<"'
            break
        case '>':
            cond = 'compState == ">"'
            break
        case '=':
            cond = 'compState == "="'
            break
        default:
            cond = ast.check
            break
    }

    return `
    if(${cond}){
        ${generateBlock(ast.body)}
    }`
}

function generateCurlyBlock(ast) {
    return `{
        ${generateBlock(ast.body)}
    }`
}

function generateFail(ast) {
    return `if(errorState) {
        ${generateBlock(ast.body)}
    }`
}

function generateVarRef(ast) {
    return `${ast.name}`
}

function generateVarDecl(ast) {
    let rhs = generateStatement(ast.rhs[0])
    return `let ${ast.name} = ${rhs};`
}

function generateFunctionCall(ast) {
    let libFn = lib.registerFunction(ast.name, generateList(ast.args))
    if(libFn)
        return libFn

    return `${ast.name}(${generateList(ast.args)})\n`
}

module.exports = function(ast) {
    let code = generateBlock(ast)
    let libCode = lib.getSource()

    let src = `
    let errorState = false
    let compState = ''

    async function main() {
        ${libCode}
        ${code}
    }
    main()
    `

    return src
}