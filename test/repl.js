var Zero = require( '..' )

var world = new Zero.World()
var time = Date.now()
var frames = 0

function frame() {
  var dt = time
  time = Date.now()
  dt = ( time - dt ) / 1000
  world.step( dt )
  frames++
}

setInterval( function interval() {
  frame()
  // process.stdout.write( '\n' + frames )
}, 1000 / 1000 )
