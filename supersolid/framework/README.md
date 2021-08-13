# Contents
1. [npm commands](#npm-commands)
2. [Palindrome rules](#Palindrome-Rules)

# npm commands

| Command        | Description           
| ------------- |:-------------:|
| npm start      | builds the app and runs it on localhost:3000 |
| npm run build      | builds the app using tsc      |
| npm run test | runs jest tests      |

### Things to note: 

The tests folder also contains a suite of integration tests for the endpoints. The app *must be running* for the 
integration tests to run, but the other unit tests will pass when the app is offline.

# Palindrome Rules

This app will score palindromes (words the spelt the same backwards and forwards, e.g racecar), scored at 1 point per letter.

Palindromes in any language will be validated and scored, but any spaces, numbers, punctuation or otherwise special character will be stripped out before scoring, and will not be counted.

If a valid palindrome is submitted with invalid characters mixed in (e.g. race123&car), it will still be accepted as valid, and scored at the correct value of 7 points.