/**
 * Degrees to radian conversion factor
 * @type {Number}
 * @const
 */
exports.DEG2RAD = Math.PI / 180

/**
 * Radian to degrees conversion factor
 * @type {Number}
 * @const
 */
exports.RAD2DEG = 180 / Math.PI

/**
 * Clamp a value to a given range <min, max>
 * @param  {Number} value
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
exports.clamp = function( value, min, max ) {
  return Math.max( min, Math.min( max, value ) )
}

/**
 * Compute euclidian modulo of m % n
 * @param  {Number} n
 * @param  {Number} m
 * @return {Number}
 */
exports.euclideanModulo = function( n, m ) {
  return ( ( n % m ) + m ) % m
}

/**
 * Linear mapping from range <a1, a2> to range <b1, b2>
 * @param  {Number} x
 * @param  {Number} a1
 * @param  {Number} a2
 * @param  {Number} b1
 * @param  {Number} b2
 * @return {Number}
 */
exports.mapLinear = function( x, a1, a2, b1, b2 ) {
  return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 )
}

/**
 * Smoothstep is a scalar interpolation function
 * @see https://en.wikipedia.org/wiki/Smoothstep
 * @param  {Number} x
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
exports.smoothStep = function( x, min, max ) {

  // Clamp x to 0..1 range
  if ( x <= min ) return 0
  if ( x >= max ) return 1

  // Scale, bias
  x = ( x - min ) / ( max - min )

  // Evaluate polynomial
  return x * x * ( 3 - 2 * x )

}

/**
 * Improved version of the smoothstep function
 * @see https://en.wikipedia.org/wiki/Smoothstep
 * @param  {Number} x
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
exports.smootherStep = function( x, min, max ) {

  // Clamp x to 0..1 range
  if ( x <= min ) return 0
  if ( x >= max ) return 1

  // Scale, bias
  x = ( x - min ) / ( max - min )

  // Evaluate polynomial
  return x * x * x * ( x * ( x * 6 - 15 ) + 10 )

}

/**
 * Convert degrees to radians
 * @param  {Number} deg
 * @return {Number} radians
 */
exports.degToRad = function( deg ) {
  return deg * exports.DEG2RAD
}

/**
 * Convert radians to degrees
 * @param  {Number} radians
 * @return {Number} deg
 */
exports.radToDeg = function( rad ) {
  return rad * exports.RAD2DEG
}

/**
 * Determine whether given value is a power of 2
 * @param  {Number} value
 * @return {Boolean}
 */
exports.isPowerOfTwo = function( value ) {
  return ( value & ( value - 1 ) ) === 0 && value !== 0
}

/**
 * Compute the nearest power of 2 from a given value
 * @param  {Number} value
 * @return {Number}
 */
exports.nearestPowerOfTwo = function( value ) {
  return Math.pow( 2, Math.round( Math.log( value ) / Math.LN2 ) )
}

// exports.Vector2 = require( './vector2' )
exports.Vector3 = require( './vector3' )
exports.Vector4 = require( './vector4' )

// exports.Matrix2 = require( './matrix2' )
// exports.Matrix3 = require( './matrix3' )
// exports.Matrix4 = require( './matrix4' )

exports.Quaternion = require( './quaternion' )
