# ConsColors

Yet another npm package that prints colors in your console :tada:

But... the idea behind this module it's not that you can get crazy and print 1000s of different styles, this module gives you the ability to print `log`, `warn` or `error` messages to the `stdout` with a predefined message.

Have you found yourself doing something like this?

```javascript
function Animal( name ) {
  this.name = name;
  .....
}

const lion = new Animal( 'Simba' );
const cat = new Animal( 'Garfield' );
const dog = new Animal( 'Scooby-Doo' );

console.log('lion:', lion);
console.log('cat:', cat);
console.log('dog:',dog);
```
 
 The idea of this module is that by creating an instance of the logger you can omit the reference to the variable that you are trying to log the info.

```javascript
const lionLogger = ConsColors( 'lion' );

lionLogger.log( 'hakuna matata' ); // lion: hakuna matata
```
[emoji cheat](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

[Console](https://nodejs.org/api/console.html)

[ansi colors](https://ourcodeworld.com/articles/read/298/how-to-show-colorful-messages-in-the-console-in-node-js)

[ansi colors 2](https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script)

[ansi colors 3](http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html)

```javascript
function ConsColors( type ) {
  return {
    log: (text) => console.log('\x1b[34m\x1b[41m',`${type}:`, text, '\x1b[0m')
  }
}

const xoxo = ConsColors( 'xoxo' );

xoxo.log([{xox: 90}]);
```