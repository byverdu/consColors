/* dev-code */
const chai = require( 'chai' );
const sinon = require( 'sinon' );
const expect = chai.expect;
let colorBuilderSpy;

beforeEach(() => {
  colorBuilderSpy = sinon.spy( colorBuilder );
});


describe( 'colorBuilder', () => {
  it( 'is defined', () => {
    expect( colorBuilder ).not.eq( undefined );
  });
  it( 'is a function', () => {
    expect( consColors ).to.be.a( 'function' );
  });
  it( 'returns default options if no argument passed', () => {
    const defaultOptions = {
      log: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    colorBuilderSpy();
    
    expect( colorBuilderSpy.alwaysReturned(defaultOptions)).to.eq(true);
  });
});

/* end-dev-code */
function colorBuilder() {
  const resetChars =  '\x1b[0m';
  return {
    log: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    reset: resetChars
  }
}

function consColors() {
  colorBuilder()
  return {
    log: () => {},
    warn: () => {},
    error: () => {}
  }
}


module.exports = consColors;