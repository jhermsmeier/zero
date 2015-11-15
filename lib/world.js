var Emitter = require( 'async-emitter' )
var inherit = require( 'bloodline' )

/**
 * World
 * @constructor
 * @param {Object} options
 *   @property {Number} timeStep dt
 * @return {World}
 */
function World( options ) {
  
  if( !(this instanceof World) )
    return new World( options )
  
  Emitter.call( this )
  
  options = options != null ?
    options : {}
  
  // Fixed time step
  this.timeStep = options.timeStep || ( 1 / 60 )
  // Maximum sub steps
  this.maxSubSteps = options.maxSubSteps || 10
  
  // Last used timestep
  this.dt = -1
  // Wall-clock time since simulation start
  this.time = 0
  // Time accumulator for interpolation
  // @see http://gafferongames.com/game-physics/fix-your-timestep/
  this.accumulator = 0
  
  // Objects in the world
  this.objects = []
  
}

/**
 * World prototype
 * @type {Object}
 */
World.prototype = {
  
  constructor: World,
  
  get objectCount() {
    return this.objects.length
  },
  
  add: function( body ) {
    this.emit( 'add', body )
  },
  
  remove: function( body ) {
    this.emit( 'remove', body )
  },
  
  // TODO: Figure out how to do time acceleration
  step: function( dt, timeStep, maxSubSteps ) {
    
    timeStep = timeStep || this.timeStep
    maxSubSteps = maxSubSteps || this.maxSubSteps
    
    if( dt >= maxSubSteps * timeStep ) {
      console.warn( 'Losing simulation time, delta is too low' )
    }
    
    if( dt === 0 ) {
      
      // Fixed time stepping
      this.integrate( dt )
      this.time = this.time + timeStep
      
    } else {
      
      var subSteps = 0
      
      // Dynamic substepping
      this.accumulator = this.accumulator + dt
      
      // Do fixed steps to catch up
      while( this.accumulator >= dt && subSteps < maxSubSteps ) {
        this.integrate( dt )
        this.accumulator = this.accumulator - dt
        subSteps++
      }
      
      var t = ( this.accumulator % dt ) / dt
      
      for( var i = 0; i < this.objects.length; i++ ) {
        // TODO: (S)LERP body positions & rotation
        // (s)lerp( current, t, interpolated )
      }
      
      this.time = this.time + dt
      
    }
    
  },
  
  integrate: function( dt ) {
    // TODO
  },
  
}

inherit( World, Emitter )
// Exports
module.exports = World
