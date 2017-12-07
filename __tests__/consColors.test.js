const chai = require( 'chai' );
const expect = chai.expect;
const consColors = require( '../lib/' );

describe( 'consColors', () => {
  it( 'is defined', () => {
    expect( consColors ).not.eq( undefined );
  });

  it( 'is a function', () => {
    expect( consColors ).to.be.a( 'function' );
  });

  it( 'returns an Object', () => {
    expect( typeof consColors()).to.eq( 'object' );
  });

  it( 'returns an Object with a "log" property that is a function', () => {
    expect( consColors())
      .to.have.property( 'log' )
      .and.is.a( 'function' );
  });

  it( 'returns an Object with a "warn" property that is a function', () => {
    expect( consColors())
      .to.have.property( 'warn' )
      .and.is.a( 'function' );
  });

  it( 'returns an Object with a "error" property that is a function', () => {
    expect( consColors())
      .to.have.property( 'error' )
      .and.is.a( 'function' );
  });
});