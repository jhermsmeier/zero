(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Zero = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"async-emitter":4,"bloodline":5}],3:[function(require,module,exports){
var Zero = module.exports

Zero.version = require( '../package' ).version

/**
 * Newtonian constant of gravitation
 * @type {Number}
 */
Zero.G = 6.67408 * 10e-11

Zero.Body = require( './body' )
Zero.World = require( './world' )

},{"../package":6,"./body":1,"./world":2}],4:[function(require,module,exports){
void (function() {
  
  var global = this
  
  /**
   * Emitter constructor
   */
  function Emitter() {
    this._events = this._events || {}
    this._maxListeners = 10
    this._memLeakDetected = false
  }
  
  // Exports
  if( typeof module !== 'undefined' )
    module.exports = Emitter
  else
    global.Emitter = Emitter
  
  // Use when maxTickDepth is reached
  Emitter.immediate = ( typeof setImmediate === 'function' ) ?
    setImmediate.bind( global ) :
    setTimeout.bind( global )
  
  // Use until maxTickDepth is reached
  Emitter.tick = ( global.process && typeof process.nextTick === 'function' ) ?
    process.nextTick.bind( process ) :
    setTimeout.bind( global )
  
  // Shim maxTickDepth in the browser
  Emitter.maxTicks = global.process && process.maxTickDepth ?
    global.process.maxTickDepth : 1000
  
  // Keep track of tick count
  Emitter.tickCount = 0
  
  /**
   * Support for setTimeout(), nextTick() and setImmediate(),
   * with some added logic to prevent starving the event loop.
   * @type {Function}
   */
  Emitter.nextTick = function( fn ) {
    if( Emitter.tickCount++ >= Emitter.maxTicks ) {
      Emitter.tickCount = 0
      Emitter.immediate( fn )
    } else {
      Emitter.tick( fn )
    }
  }
  
  /**
   * Determines if Emitters warn
   * about potential memory leaks
   * @type {Boolean}
   */
  Emitter.warn = true
  
  /**
   * Emitter prototype
   * @type {Object}
   */
  Emitter.prototype = {
    
    constructor: Emitter,
    
    /**
     * Adds a listener for the specified event
     * @param  {String}   type
     * @param  {Function} handler
     * @return {Emitter}
     */
    on: function( type, handler ) {
      
      if( handler === void 0 || handler === null )
        throw new Error( 'Missing argument "handler"' )
      
      if( typeof handler !== 'function' && typeof handler.handleEvent !== 'function' )
        throw new TypeError( 'Handler must be a function.' )
      
      this._events[ type ] ?
        this._events[ type ].push( handler ) :
        this._events[ type ] = [ handler ]
      
      if( Emitter.warn && this._events[ type ].length > this._maxListeners ) {
        if( this._maxListeners > 0 && !this._memLeakDetected ) {
          this._memLeakDetected = true
          console.warn(
            'WARNING: Possible event emitter memory leak detected.',
            this._events[ type ].length, 'event handlers added.',
            'Use emitter.setMaxListeners() to increase the threshold.'
          )
          console.trace()
        }
      }
      
      return this
      
    },
    
    /**
     * Adds a one time listener for the specified event
     * @param  {String}   type
     * @param  {Function} handler
     * @return {Emitter}
     */
    once: function( type, handler ) {
      
      if( handler === void 0 || handler === null )
        throw new Error( 'Missing argument "handler"' )
      
      if( typeof handler !== 'function' && typeof handler.handleEvent !== 'function' )
        throw new TypeError( 'Handler must be a function.' )
      
      function wrapper() {
        this.removeListener( type, wrapper )
        typeof handler !== 'function'
          ? handler.handleEvent.apply( handler, arguments )
          : handler.apply( this, arguments )
      }
      
      this._events[ type ] ?
        this._events[ type ].push( wrapper ) :
        this._events[ type ] = [ wrapper ]
      
      return this
      
    },
    
    /**
     * Execute each of the listeners in order
     * with the supplied arguments
     * @param  {String}  type
     * @return {Boolean}
     */
    emit: function( type ) {
      
      var emitter = this
      var listeners = this._events[ type ]
      
      if( type === 'error' && !listeners ) {
        if( !this._events.error ) {
          throw !( arguments[1] instanceof Error ) ?
            new Error( 'Unhandled "error" event.' ) :
            arguments[1]
        }
      } else if( !listeners ) {
        return false
      }
      
      var argv = [].slice.call( arguments, 1 )
      var i, len = listeners.length
      
      function fire( handler, argv ) {
        typeof handler !== 'function' ?
          handler.handleEvent.apply( handler, argv ) :
          handler.apply( this, argv )
      }
      
      for( i = 0; i < len; i++ ) {
        Emitter.nextTick(
          fire.bind( this, listeners[i], argv )
        )
      }
      
      return true
      
    },
    
    /**
     * Execute each of the listeners in order
     * with the supplied arguments *synchronously*
     * @param  {String}  type
     * @return {Boolean}
     */
    emitSync: function( type ) {
      
      var emitter = this
      var listeners = this._events[ type ]
      
      if( type === 'error' && !listeners ) {
        if( !this._events.error ) {
          throw !( arguments[1] instanceof Error ) ?
            new Error( 'Unhandled "error" event.' ) :
            arguments[1]
        }
      } else if( !listeners ) {
        return false
      }
      
      var argv = [].slice.call( arguments, 1 )
      var handler, i, len = listeners.length
      
      for( i = 0; i < len; i++ ) {
        handler = listeners[i]
        typeof handler !== 'function'
          ? handler.handleEvent.apply( handler, argv )
          : handler.apply( this, argv )
      }
      
      return true
      
    },
    
    /**
     * Returns an array of listeners
     * for the specified event
     * @param  {String} type
     * @return {Array}
     */
    listeners: function( type ) {
      return this._events[ type ] ?
        this._events[ type ].slice() : []
    },
    
    /**
     * Sets the number of listeners that can
     * be added before a potential memory leak
     * warning is issued. Set to zero to disable.
     * @param {Number}   value
     * @return {Emitter}
     */
    setMaxListeners: function( value ) {
      
      if( typeof value !== 'number' )
        throw new TypeError( 'Value must be a number.' )
      
      this._maxListeners = value
      
      return this
      
    },
    
    /**
     * Remove a listener for the specified event
     * @param  {String}   type
     * @param  {Function} handler
     * @return {Emitter}
     */
    removeListener: function( type, handler ) {
      
      var handlers = this._events[ type ]
      var position = handlers.indexOf( handler )
      
      if( handlers && ~position ) {
        if( handlers.length === 1 ) {
          this._events[ type ] = undefined
          delete this._events[ type ]
        } else {
          handlers.splice( position, 1 )
        }
      }
      
      return this
      
    },
    
    /**
     * Removes all listeners,
     * or those of the specified event
     * @param  {String}  type
     * @return {Emitter}
     */
    removeAllListeners: function( type ) {
      
      if( arguments.length === 0 ) {
        for( type in this._events ) {
          this.removeAllListeners( type )
        }
      } else {
        this._events[ type ] = undefined
        delete this._events[ type ]
      }
      
      return this
      
    }
    
  }
  
})()

},{}],5:[function(require,module,exports){
/**
 * Retrieves an object's description
 * @param  {Object} object
 * @return {Object} description
 */
function describe( object ) {
  return Object.getOwnPropertyNames( object )
    .reduce( function( desc, key ) {
      desc[ key ] = Object.getOwnPropertyDescriptor( object, key )
      return desc
    }, Object.create( null ))
}

/**
 * Inherits from sctor to ctor
 * @param  {Function} ctor
 * @param  {Function} sctor
 * @return {Object} 
 */
function inherit( ctor, sctor ) {
  ctor.prototype = Object.create(
    sctor.prototype,
    describe( ctor.prototype )
  )
}

module.exports = inherit

},{}],6:[function(require,module,exports){
module.exports={
  "name": "zero-physics",
  "version": "0.0.0",
  "description": "3D Physics Engine",
  "license": "MIT",
  "keywords": [
    "3d",
    "physics",
    "engine"
  ],
  "main": "lib/zero",
  "author": "Jonas Hermsmeier <jhermsmeier@gmail.com> (https://jhermsmeier.de/)",
  "dependencies": {
    "async-emitter": "~1.5.2",
    "bloodline": "~1.0.0"
  },
  "devDependencies": {
    "browserify": "~12.0.1",
    "mocha": "~2.3.3",
    "uglify-js": "~2.5.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bundle": "browserify --bare -e lib/zero.js -s Zero -o dist/zero.js",
    "min": "uglifyjs --bare-returns -c -m -o dist/zero.min.js dist/zero.js",
    "dist": "npm run bundle && npm run min",
    "watch": "watch -c -n 10 npm run dist"
  },
  "homepage": "https://github.com/jhermsmeier/zero-physics",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jhermsmeier/zero-physics.git"
  },
  "bugs": {
    "url": "https://github.com/jhermsmeier/zero-physics/issues"
  },
  "directories": {
    "test": "test"
  }
}

},{}]},{},[3])(3)
});