/**
 * Vector4
 * @constructor
 * @return {Vector4}
 */
function Vector4( x, y, z, w ) {

  if( !(this instanceof Vector4) )
    return new Vector4( x, y, z, w )

  this.x = x || 0
  this.y = y || 0
  this.z = z || 0
  this.w = w != null ? w : 1

}

Vector4.fromArray = function( array, offset ) {
  return new Vector4().fromArray( array, offset )
}

Vector4.equals = function( a, b ) {
  return ( a.x === b.x ) &&
    ( a.y === b.y ) &&
    ( a.z === b.z ) &&
    ( a.w === b.w )
}

/**
 * Vector4 prototype
 * @type {Object}
 */
Vector4.prototype = {

  constructor: Vector4,

  set: function( x, y, z, w ) {

    this.x = x
    this.y = y
    this.z = z
    this.w = w

    return this

  },

  clone: function() {
    return new this.constructor( this.x, this.y, this.z, this.w )
  },

  copy: function( source ) {

    this.x = source.x
    this.y = source.y
    this.z = source.z
    this.w = source.w != null ?
      source.w : 1

    return this

  },

  dot: function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
  },

  add: function( vector ) {

    this.x = this.x + vector.x
    this.y = this.y + vector.y
    this.z = this.z + vector.z
    this.w = this.w + vector.w

    return this

  },

  addScalar: function( scalar ) {

    this.x = this.x + scalar
    this.y = this.y + scalar
    this.z = this.z + scalar
    this.w = this.w + scalar

    return this

  },

  addScaledVector: function( vector, scalar ) {

    this.x = this.x + vector.x * scalar
    this.y = this.y + vector.y * scalar
    this.z = this.z + vector.z * scalar
    this.w = this.w + vector.w * scalar

    return this

  },

  sub: function( vector ) {

    this.x = this.x - vector.x
    this.y = this.y - vector.y
    this.z = this.z - vector.z
    this.w = this.w - vector.w

    return this

  },

  subScalar: function( scalar ) {

    this.x = this.x - scalar
    this.y = this.y - scalar
    this.z = this.z - scalar
    this.w = this.w - scalar

    return this

  },

  multiplyScalar: function( scalar ) {

    if( isFinite( scalar ) ) {

      this.x = this.x * scalar
      this.y = this.y * scalar
      this.z = this.z * scalar
      this.w = this.w * scalar

    } else {

      this.x = 0
      this.y = 0
      this.z = 0
      this.w = 0

    }

    return this

  },

  divideScalar: function( scalar ) {
    return this.multiplyScalar( 1 / scalar )
  },

  min: function( vector ) {

    this.x = Math.min( this.x, vector.x )
    this.y = Math.min( this.y, vector.y )
    this.z = Math.min( this.z, vector.z )
    this.w = Math.min( this.w, vector.w )

    return this

  },

  max: function( vector ) {

    this.x = Math.max( this.x, vector.x )
    this.y = Math.max( this.y, vector.y )
    this.z = Math.max( this.z, vector.z )
    this.w = Math.max( this.w, vector.w )

    return this

  },

  clamp: function( min, max ) {

    this.x = Math.max( min.x, Math.min( max.x, this.x ) )
    this.y = Math.max( min.y, Math.min( max.y, this.y ) )
    this.z = Math.max( min.z, Math.min( max.z, this.z ) )
    this.w = Math.max( min.w, Math.min( max.w, this.w ) )

    return this

  },

  floor: function() {

    this.x = Math.floor( this.x )
    this.y = Math.floor( this.y )
    this.z = Math.floor( this.z )
    this.w = Math.floor( this.w )

    return this

  },

  ceil: function() {

    this.x = Math.ceil( this.x )
    this.y = Math.ceil( this.y )
    this.z = Math.ceil( this.z )
    this.w = Math.ceil( this.w )

    return this

  },

  round: function() {

    this.x = Math.round( this.x )
    this.y = Math.round( this.y )
    this.z = Math.round( this.z )
    this.w = Math.round( this.w )

    return this

  },

  negate: function() {

    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    this.w = -this.w

    return this

  },

  normalize: function() {
    return this.divideScalar( this.length() )
  },

  length: function() {
    return Math.sqrt( this.lengthSq() )
  },

  lengthSq: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  },

  lengthManhattan: function() {
    return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w )
  },

  setLength: function( length ) {
    return this.multiplyScalar( length / this.length() )
  },

  lerp: function( vector, alpha ) {

    this.x = this.x + ( vector.x - this.x ) * alpha
    this.y = this.y + ( vector.y - this.y ) * alpha
    this.z = this.z + ( vector.z - this.z ) * alpha
    this.w = this.w + ( vector.w - this.w ) * alpha

    return this

  },

  equals: function( vector ) {
    return Vector4.equals( this, vector )
  },

  fromArray: function( array, offset ) {

    offset = offset || 0

    this.x = array[ offset + 0 ]
    this.y = array[ offset + 1 ]
    this.z = array[ offset + 2 ]
    this.w = array[ offset + 3 ]

    return this

  },

  toArray: function() {
    return [ this.x, this.y, this.z, this.w ]
  },

}

// Exports
module.exports = Vector4
