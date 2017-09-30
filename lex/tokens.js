module.exports = [
    // Tokens
    {name:'KEY_WORD', regex:String.raw`^var`},
    {name:'IDENTIFIER', regex:String.raw`^[a-zA-Z][a-zA-Z0-9_]*`},

    // Symbols
    {name:'LEFT_PAREN', regex:String.raw`^\(`},
    {name:'RIGHT_PAREN', regex:String.raw`^\)`},
    {name:'COMMA', regex:String.raw`^,`},

    // Literals
    {name:'STRING', regex:String.raw`^'[^']*'`},
    {name:'FLOAT', regex:String.raw`^[0-9]+.[0-9]+`},
    {name:'INTEGER', regex:String.raw`^[0-9]+`},

    // Operators
    {name:'EQUALS', regex:String.raw`^=`},

    // White space
    {name:'LINE_BREAK', regex:String.raw`^\n`},
    {name:'WHITE_SPACE', regex:String.raw`^\s+`},

    // Comments
    {name:'COMMENT', regex:String.raw`^\/\/.*\n`},
    {name:'BLOCK_COMMENT', regex:String.raw`^\/\*[\s\S]*\*\/`},
]