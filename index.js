var ndarray = require('ndarray')
var fill = require('ndarray-fill')
var crunch = require('voxel-crunch')

// function atob (str) {
//   return new Buffer(str, 'base64').toString('binary')
// }

function create (resolution) {
  var n = ndarray(new Int32Array(resolution * resolution * resolution), [resolution, resolution, resolution])
  var bounds = resolution - 2
  var white = 7
  var blue = 8

  fill(n, function (x, y, z) {
    if ((x === 0) || (x === bounds) || (z === 0) || (z === bounds)) {
      return 0
    }

    if ((x % 6 < 2) && (z % 6 < 2) && (y < 8)) {
      return blue
    }

    if (y < 3) {
      return white
    }

    return 0
  })

  return n
}

var field = create(32)
var rle = crunch.encode(field.data)
var buffer = new Buffer(rle)
console.log('data:' + buffer.toString('base64'))
