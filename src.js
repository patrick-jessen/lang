
> lang@1.0.0 source /home/patrick/code/js/github.com/lang
> node lang.js -s > js.js && js-beautify js.js && echo && rm js.js

let errorState = false
let compState = ''

async function main() {
    function print(...args) {
        console.log(...args);
    }

    function read() {
        return new Promise(function(res, rej) {
            let readline = require('readline');
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            rl.on('line', function(line) {
                rl.close();
                res(line)
            })
        })
    }

    function tryParseInt(arg) {
        errorState = false
        let r = parseInt(arg)
        if (Number.isNaN(r))
            errorState = true
        return r
    }

    function compare(a, b) {
        if (Number.isNaN(a) || Number.isNaN(b)) {
            compState = ''
            return
        }

        if (a > b) compState = '>'
        else if (a < b) compState = '<'
        else compState = '='
    }
    let correct = 42;
    print("Enter a number between 0 and 100:")
    let guess = tryParseInt(await read());
    if (errorState) {
        print("Wrong format, try again")

    }
    compare(guess, correct)

    if (compState == "<") {
        print("Too low")

    }
    if (compState == ">") {
        print("Too high")

    }
    if (compState == "=") {
        print("You guessed it")

    }
    if ( // correct == 10){
        print("asd")

    }
}
main()
