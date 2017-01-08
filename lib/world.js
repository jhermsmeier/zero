var Zero = require( './zero' )
var Emitter = require( 'async-emitter' )
var inherit = require( 'bloodline' )
var Queue = require( 'denque' )

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
  this.objects = new Queue( options.objectCapacity )

  this.integrator = options.integrator ||
    new Zero.Integrator.Simple( this, options )

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

  // TODO: Reason about naming
  addObject: function( body ) {
    this.objects.push( body )
    this.emit( 'add', body )
  },

  removeObject: function( body ) {

    var index = this.objects.indexOf( body )

    if( ~index ) {
      this.objects.splice( index, 1 )
    }

    this.emit( 'remove', body )

  },

  // TODO: Figure out how to do time acceleration
  step: function( dt, timeStep, maxSubSteps ) {

    timeStep = timeStep || this.timeStep
    maxSubSteps = maxSubSteps || this.maxSubSteps

    timeStep !== 0 ?
      this.integrate( dt, timeStep, maxSubSteps ) :
      this.integrateStep( dt, timeStep )

  },

  interpolate: function( dt ) {

    var t = ( this.accumulator % dt ) / dt
    var object

    // TODO: (S)LERP body positions & rotation
    // (s)lerp( current, t, interpolated )
    for( var i = 0; i < this.objects.length; i++ ) {

      object = this.objects.get( i )

      object.previousPosition.lerp(
        object.position, t,
        object.interpolatedPosition
      )

      object.previousQuaternion.slerp(
        object.quaternion, t,
        object.interpolatedQuaternion
      )

      object.previousQuaternion.normalize()

    }

  },

  integrateStep: function( dt, timeStep ) {
    // Fixed time stepping
    this.integrator.step( dt )
    this.time += timeStep
  },

  integrate: function( dt, timeStep, maxSubSteps ) {

    // TODO: Thoroughly understand this
    if( dt >= maxSubSteps * timeStep ) {
      console.warn( 'Losing simulation time, delta is too high:', dt.toFixed(3) )
    }

    var subSteps = 0

    // Dynamic substepping
    this.accumulator += dt

    // Do fixed steps to catch up
    while( this.accumulator >= dt && subSteps < maxSubSteps ) {
      this.integrator.step( dt )
      this.accumulator -= dt
      subSteps++
    }

    this.interpolate( dt )
    this.time += dt

  },

  clearForces: function() {

    var object

    for( var i = 0; i !== this.objects.length; i++ ) {
      object = this.objects.get( i )
      object.force.set( 0, 0, 0 )
      object.torque.set( 0, 0, 0 )
    }

  },

}

inherit( World, Emitter )
// Exports
module.exports = World
