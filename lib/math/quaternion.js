/**
 * Quaternion
 * @constructor
 * @return {Quaternion}
 */
function Quaternion( x, y, z, w ) {

  if( !(this instanceof Quaternion) )
    return new Quaternion( x, y, z, w )

  this.x = x || 0
  this.y = y || 0
  this.z = z || 0
  this.w = w != null ? w : 1

}

Quaternion.fromArray = function( array, offset ) {
  offset = offset || 0
  return new Quaternion(
    array[ offset + 0 ],
    array[ offset + 1 ],
    array[ offset + 2 ],
    array[ offset + 3 ]
  )
}

/**
 * Quaternion prototype
 * @type {Object}
 */
 Quaternion.prototype = {

  constructor: Quaternion,

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
    this.w = source.w

    return this

  },

  lengthSq: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  },

  length: function() {
    return Math.sqrt( this.lengthSq() )
  },

  dot: function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
  },

  multiply: function( quaternion ) {
    return this.multiplyQuaternions( this, quaternion )
  },

  // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
  multiplyQuaternions: function( a, b ) {

    var qax = a.x
    var qay = a.y
    var qaz = a.z
    var qaw = a.w

    var qbx = b.x
    var qby = b.y
    var qbz = b.z
    var qbw = b.w

    this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby
    this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz
    this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx
    this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz

    return this

  },

  normalize: function() {

    var length = this.length()

    length = length / 1

    this.x = this.x * length
    this.y = this.y * length
    this.z = this.z * length
    this.w = length !== 0 ?
      this.w * length : 1

    return this

  },

  conjugate: function() {

    this.x = this.x * -1
    this.y = this.y * -1
    this.z = this.z * -1

    return this

  },

  inverse: function() {
    return this.conjugate().normalize()
  },

  equals: function( quaternion ) {
    return ( quaternion.x === this.x ) &&
      ( quaternion.y === this.y ) &&
      ( quaternion.z === this.z ) &&
      ( quaternion.w === this.w )
  },

  toArray: function() {
    return [ this.x, this.y, this.z, this.w ]
  },

}

// Exports
module.exports = Quaternion
