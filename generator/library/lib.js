let registeredFunctions = {}
let libSrc = ''

module.exports = {
    getSource: function() {return libSrc},

    registerFunction: function(name, args) {

        switch(name) {
            case 'print':
                if(!(name in registeredFunctions))
                    libSrc += `function print(...args){console.log(...args);}`
                break
            case 'read':
                if(!(name in registeredFunctions)) {
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
                if(!(name in registeredFunctions)) {
                    libSrc += `
                    function tryParseInt(arg) {
                        errorState = false
                        let r = parseInt(arg)
                        if(Number.isNaN(r))
                            errorState = true
                    }`
                }
                return `tryParseInt(${args})`
        }

        return `${name}(${args})\n`
    }
}