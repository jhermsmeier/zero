/**
 * Body
 * @return {Body}
 */
function Body() {

  if( !(this instanceof Body) )
    return new Body()

  this.position = null
  this.rotation = null

  this.velocity = null
  this.angularVelocity = null

  this.force = null
  this.torque = null

}

/**
 * Body prototype
 * @type {Object}
 */
Body.prototype = {

  constructor: Body,

}

// Exports
module.exports = Body
