// Hello world program
var correct = 42
print('Enter a number between 0 and 100:')
var guess = int(read())
    fail: {
        print('Wrong format, try again')
        //retry
    }

compare(guess, correct)
    <: print('Too low')
    >: print('Too high')
    =: print('You guessed it')

// loop(0, 5) 
//     print('test') 
