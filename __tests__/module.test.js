const chai = require( 'chai' );
const expect = chai.expect;
const consColors = require( '../lib/' );

describe( 'Console-colors', () => {
  it( 'is defined', () => {
    expect( consColors ).not.eq( undefined );
  });

  it( 'is a function', () => {
    expect( consColors ).to.be.a( 'function' );
  });
});