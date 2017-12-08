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
      expect( consColors())
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
    const optsInvert = {
      type: 'Lion',
      invert: true
    };
    const testConsColor = consColors( opts );
    const testConsColorInvert = consColors( optsInvert );
    beforeEach(() => {
      consoleSpy = sinon.spy( console, 'log' );
    });
    afterEach(() => {
      consoleSpy.restore();
    });

    it( 'consColor accepts an object as parameter', () => {
      consColorsSpy = sinon.spy( consColors );
      consColorsSpy( opts );
      expect( consColorsSpy ).to.have.been.calledWith( opts );
    });

    it( 'consColor should warn when the opts are omitted', () => {
      consColorsSpy();
      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[31m','You omitted the options object all props were set to empty', '\x1b[0m' );
    });

    it( 'consColor should warn when the opts properties are wrong, type case', () => {
      consColorsSpy({pipe: 'wrong type', revert: false});
      expect( consoleSpy ).to.have.been.calledTwice;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[31m','pipe is not a valid property, it should be "type" or "invert"', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.log', () => {
      testConsColor.log( 'roar' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[32m','Lion: roar', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.warn', () => {
      testConsColor.warn( 'roar 2 times' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[33m','Lion: roar 2 times', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.error', () => {
      testConsColor.error( 'roar with error' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[31m','Lion: roar with error', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.log with invert option', () => {
      testConsColorInvert.log( 'roar' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[7;32m','Lion: roar', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.warn with invert option', () => {
      testConsColorInvert.warn( 'roar 2 times' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[7;33m','Lion: roar 2 times', '\x1b[0m' );
    });

    it( 'calls console.log for consColors.error with invert option', () => {
      testConsColorInvert.error( 'roar with error' );

      expect( consoleSpy ).to.have.been.calledOnce;
      expect( consoleSpy ).to.have.been.calledWith('\x1b[7;31m','Lion: roar with error', '\x1b[0m' );
    });
  });
});
