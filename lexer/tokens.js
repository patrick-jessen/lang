let t = {
    KEY_WORD: 'KEY_WORD',
    IDENTIFIER: 'IDENTIFIER',
    LEFT_PAREN: 'LEFT_PAREN',
    RIGHT_PAREN: 'RIGHT_PAREN',
    COMMA: 'COMMA',
    STRING: 'STRING',
    FLOAT: 'FLOAT',
    INTEGER: 'INTEGER',
    EQUALS: 'EQUALS',
    LINE_BREAK: 'LINE_BREAK',
    WHITE_SPACE: 'WHITE_SPACE',
    COMMENT: 'COMMENT',
    BLOCK_COMMENT: 'BLOCK_COMMENT'
}

module.exports = {
    tokens: t,
    defs: [
        // Tokens
        {name:t.KEY_WORD, regex:String.raw`^(var)`},
        {name:t.IDENTIFIER, regex:String.raw`^([a-zA-Z][a-zA-Z0-9_]*)`},

        // Symbols
        {name:t.LEFT_PAREN, regex:String.raw`^\(`},
        {name:t.RIGHT_PAREN, regex:String.raw`^\)`},
        {name:t.COMMA, regex:String.raw`^,[ ]?`},

        // Literals
        {name:t.STRING, regex:String.raw`^'([^']*)'`},
        {name:t.FLOAT, regex:String.raw`^([0-9]+.[0-9]+)`},
        {name:t.INTEGER, regex:String.raw`^([0-9]+)`},

        // Operators
        {name:t.EQUALS, regex:String.raw`^=`},

        // White space
        {name:t.LINE_BREAK, regex:String.raw`^\n`},
        {name:t.WHITE_SPACE, regex:String.raw`^\s+`},

        // Comments
        {name:t.COMMENT, regex:String.raw`^\/\/.*\n()`},
        {name:t.BLOCK_COMMENT, regex:String.raw`^\/\*[\s\S]*\*\/()`},
]}