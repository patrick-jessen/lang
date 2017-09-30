let tokenDefs = require('./tokens').defs

// Perform lex on a substring
function performLex(src, tokens) {
    for(let i in tokenDefs) {
        let m = src.match(new RegExp(tokenDefs[i].regex))
        if(m) {
            let newToken = {
                token: tokenDefs[i].name
            }

            // Capture group means 'include value'
            if(m.length > 1) {
                if(m[1].length == 0) {
                    // Empty group means 'ignore token'
                    return m[0].length
                }

                newToken.value = m[1]
            }

            tokens.push(newToken)
            return m[0].length
        }
    }
    console.warn('LEXER: unknown statement:', src)
    return 1
}

module.exports = function(src) {
    let tokens = []
    let iter = 0

    while(iter < src.length) {
        iter += performLex(src.substring(iter), tokens)
    }
    
    return tokens
}