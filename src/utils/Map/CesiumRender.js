import * as Cesium from 'cesium/Cesium'
var computeCircle = function(radius) {
  var positions = []
  for (var i = 0; i < 360; i++) {
    var radians = Cesium.Math.toRadians(i)
    positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
  }
  return positions
}

/*
绘制管道管，
var tub = CesiumRender.getTube([[-90.0, 32.0, 30000],
      [-90.0, 36.0, 0],
      [-94.0, 36.0, -30000]], 30000)
    var tb2 = viewer.entities.add(tub)
    viewer.zoomTo(tb2)
*/
export function getTube(pointArr, radius, material) {
  pointArr.forEach(p => { p[2] = p[2] - radius })
  var points = Cesium.Cartesian3.fromDegreesArrayHeights(pointArr.flat())

  var volume = {
    name: 'Red tube with rounded corners',
    polylineVolume: {
      positions: points,
      shape: computeCircle(radius),
      material: material
    }
  }

  return volume
}
