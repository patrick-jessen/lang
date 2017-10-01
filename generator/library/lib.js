let registeredFunctions = {}
let libSrc = ''

module.exports = {
    getSource: function() {return libSrc},

    registerFunction: function(name, args) {

        let wasRegistered = (name in registeredFunctions)
        registeredFunctions[name] = true

        switch(name) {
            case 'print':
                if(!wasRegistered)
                    libSrc += `function print(...args){console.log(...args);}`
                break
            case 'read':
                if(!wasRegistered) {
                    libSrc += `
                    function read(){
                        return new Promise(function(res, rej) {
                            let readline = require('readline');
                            var rl = readline.createInterface({
                                input: process.stdin,
                                output: process.stdout,
                                terminal: false
                            });
                            rl.on('line', function(line){
                                rl.close();
                                res(line)
                            })
                        })
                    }
                    `
                }
                return `await read(${args})\n`
            case 'int':
                if(!wasRegistered) {
                    libSrc += `
                    function tryParseInt(arg) {
                        errorState = false
                        let r = parseInt(arg)
                        if(Number.isNaN(r))
                            errorState = true
                        return r
                    }`
                }
                return `tryParseInt(${args})`
            case 'compare':
                if(!wasRegistered) {
                    libSrc += `
                    function compare(a, b) {
                        if(Number.isNaN(a) || Number.isNaN(b)) {
                            compState = ''
                            return
                        }

                        if(a > b) compState = '>'
                        else if(a < b) compState = '<'
                        else compState = '='                      
                    }`
                }
                break
            case 'loop':
                if(!wasRegistered) {
                    libSrc += `
                    function loop(start, end, step = 1) {
                        
                    }
                    `
                }
        }

        return `${name}(${args})\n`
    }
}