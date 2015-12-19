/**
 * SimpleIntegrator
 * @return {SimpleIntegrator}
 */
function SimpleIntegrator( world, options ) {
  
  if( !(this instanceof SimpleIntegrator) )
    return new SimpleIntegrator( world, options )
  
  this.world = world
  this.options = options || {}
  
  this.gravity = options.gravity ||
    new Vector3( 0, -9.8, 0 )
  
}

/**
 * SimpleIntegrator prototype
 * @type {Object}
 */
SimpleIntegrator.prototype = {
  
  constructor: SimpleIntegrator,
  
  applyGravity: function() {
    
    var f = null
    var m = null
    
    var gx = this.gravity.x
    var gy = this.gravity.y
    var gz = this.gravity.z
    
    for( var i = 0; i < this.world.objectCount; i++ ) {
      
      // Only act on dynamic bodies
      if( !this.world.objects[i].isDynamic )
        continue
      
      f = this.world.objects[i].force
      m = this.world.objects[i].mass
      
      f.x += m * gx
      f.y += m * gy
      f.z += m * gz
      
    }
    
  },
  
  detectCollisions: function() {
    // TODO
  },
  
  solveCollisions: function() {
    // TODO
  },
  
  applyDamping: function() {
    // TODO
  },
  
  step: function( dt ) {
    this.applyGravity()
    // this.detectCollisions()
    // this.solveCollisions( dt )
    // this.applyDamping( dt )
    // this.leapfrog( dt )
    this.world.clearForces()
  },
  
}

// Exports
module.exports = SimpleIntegrator
