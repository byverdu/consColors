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
    colorBuilderSpy( 'invert' );
    
    expect( colorBuilderSpy ).to.calledWithExactly( 'invert' );
    expect( colorBuilderSpy ).to.have.returned( userOptions );
  });
  it( 'only "invert" string is allowed', () => {
    ;
    expect( () => colorBuilder( 'Bazinga!' ) ).to.have.throw( 'Sorry only "invert" word is allowed \n You wrote Bazinga' );
  });
});

/* end-dev-code */
function colorBuilder( userOpts ) {
  var resetChars =  '\x1b[0m';
  var invertColor = '';
  
  if ( userOpts ) {
    if ( userOpts === 'invert' ) {
      invertColor = '7;';
    } else {
      throw new Error( 'Sorry only "invert" word is allowed \n You wrote ' + userOpts )
    }
  }

  return {
    log: '\x1b['+ invertColor +'32m',
    warn: '\x1b['+ invertColor +'33m',
    error: '\x1b['+ invertColor +'31m',
    reset: '\x1b[0m'
  };
}

function consColors( opts ) {
  var colors = colorBuilder( opts.invert );

  function stringFormatter( text ) {
    return (opts.type + ': ' + text);
  }
  // console.log(stringFormatter( 'roar' ).length)

  return {
    log: ( toLog ) => {
      console.log( colors.log, stringFormatter( toLog ), colors.reset )
    },
    warn: () => {},
    error: () => {}
  }
}


module.exports = consColors;
