"use strict";
/* dev-code */
const chai = require( 'chai' );
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const expect = chai.expect;
let colorBuilderSpy;
chai.use( sinonChai );

beforeEach(() => {
  colorBuilderSpy = sinon.spy( colorBuilder );
});

function getOptions( extraChars ) {
  return {
    log: '\x1b['+ extraChars +'32m',
    warn: '\x1b['+ extraChars +'33m',
    error: '\x1b['+ extraChars +'31m',
    reset: '\x1b[0m'
  };
}

describe( 'colorBuilder', () => {
  it( 'is defined', () => {
    expect( colorBuilder ).not.eq( undefined );
  });
  it( 'is a function', () => {
    expect( colorBuilder ).to.be.a( 'function' );
  });
  it( 'returns default options if no argument passed', () => {
    const defaultOptions = getOptions('');
    colorBuilderSpy();
    
    expect( colorBuilderSpy ).to.have.returned( defaultOptions );
  });
  it( 'a user can invert the colors', () => {
    const userOptions = getOptions('7;');    
    colorBuilderSpy( true );
    
    expect( colorBuilderSpy ).to.calledWithExactly( true );
    expect( colorBuilderSpy ).to.have.returned( userOptions );
  });
  it( '"invert" option should be a boolean', () => {
    ;
    const consoleSpy = sinon.spy( console, 'warn' );
    const textError = 'Are you trying to set the invert option? You passed as argument Bazinga instead of "true". Check your options object.'
    colorBuilder( 'Bazinga' );

    expect( consoleSpy ).to.have.been.calledOnce;
    expect( consoleSpy ).to.have.been.calledWith('\x1b[31m', textError, '\x1b[0m');
    consoleSpy.restore();    
  });
});

function colorBuilder( userOpts ) {
  var resetChars =  '\x1b[0m';
  var invertColor;

  switch ( userOpts ) {
    case true:
      invertColor = '7;'
      break;
    case undefined:
      invertColor = '';
      break;
    default:
      var textError = 'Are you trying to set the invert option? You passed as argument ' + userOpts + ' instead of "true". Check your options object.'
      console.warn( '\x1b[31m', textError, '\x1b[0m' );
  }

  return {
    log: '\x1b['+ invertColor +'32m',
    warn: '\x1b['+ invertColor +'33m',
    error: '\x1b['+ invertColor +'31m',
    reset: '\x1b[0m'
  };
}

/* end-dev-code */
(function ( consColors ) {
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = consColors;
} else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
        return consColors;
    });
}
}( function ( opts ) {

  var possibleProps = [ 'type', 'invert' ];
  var innerOpts;
  var optsKeys;
  if ( !opts ) {
    console.log(
      '\x1b[31m',
      'You omitted the options object all props were set to empty',
      '\x1b[0m' 
    );
    innerOpts = {};
  } else {
    innerOpts = opts;
  }

  optsKeys = Object.keys( innerOpts );
  possibleProps.forEach(function( item, index ) {
    if ( optsKeys[index] && item.indexOf( optsKeys[index] ) === -1 ) {
      console.log('\x1b[31m', optsKeys[index] + ' is not a valid property, it should be "type" or "invert"', '\x1b[0m' )
    }
  });

  var colors = colorBuilder( innerOpts.invert );

  function stringFormatter( text ) {
    return ( innerOpts.type + ': ' + text);
  }

  return {
    log( toLog ) {
      console.log(
        colors.log,
        stringFormatter( toLog ),
        colors.reset
      );
    },
    warn( toWarn ) {
      console.log(
        colors.warn,
        stringFormatter( toWarn ),
        colors.reset
      );
    },
    error( toError ) {
      console.log(
        colors.error,
        stringFormatter( toError ),
        colors.reset
      );
    }
  }
}));
