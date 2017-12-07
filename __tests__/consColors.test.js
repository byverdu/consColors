const chai = require( 'chai' );
const consColors = require( '../lib/' );
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const expect = chai.expect;
chai.use( sinonChai );

describe( 'consColors', () => {
  describe( 'Constructor', () => {
    it( 'is defined', () => {
      expect( consColors ).not.eq( undefined );
    });
  
    it( 'is a function', () => {
      expect( consColors ).to.be.a( 'function' );
    });
  
    it( 'returns an Object', () => {
      expect( typeof consColors({})).to.eq( 'object' );
    });
  
    it( 'returns an Object with a "log" property that is a function', () => {
      expect( consColors({}))
        .to.have.property( 'log' )
        .and.is.a( 'function' );
    });
  
    it( 'returns an Object with a "warn" property that is a function', () => {
      expect( consColors({}))
        .to.have.property( 'warn' )
        .and.is.a( 'function' );
    });
  
    it( 'returns an Object with a "error" property that is a function', () => {
      expect( consColors({}))
        .to.have.property( 'error' )
        .and.is.a( 'function' );
    });
  });
  describe( 'Implementation', () => {
    let consoleSpy;
    let consColorsSpy;
    const opts = {
      type: 'Lion'
    };
    const testConsColor = consColors( opts );
    beforeEach(() => {
      consoleSpy = sinon.spy( console, 'log' );
    });
    afterEach(() => {
      consoleSpy.restore();
    });

    it( 'consColor accepts an object as parameter', () => {
      consColorsSpy = sinon.spy( consColors );
      consColorsSpy( opts );
      expect( consColorsSpy ).to.have.been.calledWith( opts )
    });


    it( 'calls console.log for consColors.log', () => {
      testConsColor.log( 'roar' );

      // console.log('Lion: roar' === opts.type + ': roar')

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith( 'Lion: roar' );
    });
  });
});
