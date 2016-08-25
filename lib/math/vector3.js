/**
 * Vector3
 * @constructor
 * @return {Vector3}
 */
function Vector3( x, y, z ) {

  if( !(this instanceof Vector3) )
    return new Vector3( x, y, z )

  this.x = x || 0
  this.y = y || 0
  this.z = z || 0

}

Vector3.fromArray = function( array, offset ) {
  return new Vector3().fromArray( array, offset )
}

Vector3.equals = function( a, b ) {
  return ( a.x === b.x ) &&
    ( a.y === b.y ) &&
    ( a.z === b.z )
}

/**
 * Vector3 prototype
 * @type {Object}
 */
Vector3.prototype = {

  constructor: Vector3,

  set: function( x, y, z ) {

    this.x = x
    this.y = y
    this.z = z

    return this

  },

  clone: function() {
    return new this.constructor( this.x, this.y, this.z )
  },

  copy: function( source ) {

    this.x = source.x
    this.y = source.y
    this.z = source.z

    return this

  },

  dot: function( vector ) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  },

  cross: function( vector ) {

    this.x = this.y * vector.z - this.z * vector.y
    this.y = this.z * vector.x - this.x * vector.z
    this.z = this.x * vector.y - this.y * vector.x

    return this

  },

  add: function( vector ) {

    this.x = this.x + vector.x
    this.y = this.y + vector.y
    this.z = this.z + vector.z

    return this

  },

  addScalar: function( scalar ) {

    this.x = this.x + scalar
    this.y = this.y + scalar
    this.z = this.z + scalar

    return this

  },

  addScaledVector: function( vector, scalar ) {

    this.x = this.x + vector.x * scalar
    this.y = this.y + vector.y * scalar
    this.z = this.z + vector.z * scalar

    return this

  },

  sub: function( vector ) {

    this.x = this.x - vector.x
    this.y = this.y - vector.y
    this.z = this.z - vector.z

    return this

  },

  subScalar: function( scalar ) {

    this.x = this.x - scalar
    this.y = this.y - scalar
    this.z = this.z - scalar

    return this

  },

  multiplyScalar: function( scalar ) {

    if( isFinite( scalar ) ) {

      this.x = this.x * scalar
      this.y = this.y * scalar
      this.z = this.z * scalar

    } else {

      this.x = 0
      this.y = 0
      this.z = 0

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

    return this

  },

  max: function( vector ) {

    this.x = Math.max( this.x, vector.x )
    this.y = Math.max( this.y, vector.y )
    this.z = Math.max( this.z, vector.z )

    return this

  },

  clamp: function( min, max ) {

    this.x = Math.max( min.x, Math.min( max.x, this.x ) )
    this.y = Math.max( min.y, Math.min( max.y, this.y ) )
    this.z = Math.max( min.z, Math.min( max.z, this.z ) )

    return this

  },

  floor: function() {

    this.x = Math.floor( this.x )
    this.y = Math.floor( this.y )
    this.z = Math.floor( this.z )

    return this

  },

  ceil: function() {

    this.x = Math.ceil( this.x )
    this.y = Math.ceil( this.y )
    this.z = Math.ceil( this.z )

    return this

  },

  round: function() {

    this.x = Math.round( this.x )
    this.y = Math.round( this.y )
    this.z = Math.round( this.z )

    return this

  },

  negate: function() {

    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this

  },

  normalize: function() {
    return this.divideScalar( this.length() )
  },

  length: function() {
    return Math.sqrt( this.lengthSquared() )
  },

  lengthSquared: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  },

  lengthManhattan: function() {
    return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z )
  },

  setLength: function( length ) {
    return this.multiplyScalar( length / this.length() )
  },

  distanceTo: function( vector ) {
    return Math.sqrt( this.distanceToSquared( vector ) )
  },

  distanceToSquared: function( vector ) {

    var dx = this.x - vector.x
    var dy = this.y - vector.y
    var dz = this.z - vector.z

    return dx * dx + dy * dy + dz * dz

  },

  lerp: function( vector, alpha ) {

    this.x = this.x + ( vector.x - this.x ) * alpha
    this.y = this.y + ( vector.y - this.y ) * alpha
    this.z = this.z + ( vector.z - this.z ) * alpha

    return this

  },

  equals: function( vector ) {
    return Vector3.equals( this, vector )
  },

  fromArray: function( array, offset ) {

    offset = offset || 0

    this.x = array[ offset + 0 ]
    this.y = array[ offset + 1 ]
    this.z = array[ offset + 2 ]

    return this

  },

  toArray: function() {
    return [ this.x, this.y, this.z ]
  },

}

// Exports
module.exports = Vector3
