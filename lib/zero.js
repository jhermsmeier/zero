var Zero = module.exports

Zero.version = require( '../package' ).version

/**
 * Newtonian constant of gravitation
 * @type {Number}
 */
Zero.G = 6.67408 * 10e-11

Zero.Body = require( './body' )
Zero.World = require( './world' )
