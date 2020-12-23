import Cesium from 'cesium/Cesium'
import * as L from 'leaflet'
var CesiumOverviewMapControl = function() {
  this.init.apply(this, arguments)
}
CesiumOverviewMapControl.prototype = {
  _container: null,
  _miniMap: null,
  _viewerMoving: false,
  _miniMapMoving: false,
  _userToggledDisplay: false,
  _minimized: false,
  viewer: null,
  tileLayer: null,
  marker: null,
  linesgroup: null,
  ispatrol: false,
  options: {
    position: 'bottomleft',
    toggleDisplay: true,
    zoomLevelOffset: -1,
    zoomLevelFixed: false,
    centerFixed: false,
    zoomControl: false,
    zoomAnimation: false,
    autoToggleDisplay: false,
    minimized: false,
    width: 300,
    height: 300,
    collapsedWidth: 19,
    collapsedHeight: 19,
    markerZoomAnimation: true,
    // aimingRectOptions: { color: '#ff7800', weight: 1, interactive: false },
    // shadowRectOptions: { color: '#000000', weight: 1, interactive: false, opacity: 0, fillOpacity: 0 },
    strings: { hideText: '隐藏鹰眼', showText: '显示鹰眼' },
    mapOptions: {
      toggleDisplay: true,
      aimingRectOptions: {
        color: '#ff1100',
        weight: 1,
        opacity: 0,
        fillOpacity: 0
      },
      shadowRectOptions: {
        color: '#0000AA',
        weight: 1,
        opacity: 0,
        fillOpacity: 0
      }
    }
  },
  init: function(viewer, layer, options) {
    this.viewer = viewer
    this.tileLayer = layer
    this._container = options.container
    L.Util.setOptions(this, options)
    this.options.aimingRectOptions.interactive = false
    this.options.shadowRectOptions.interactive = false
    this._initMap()
    this._showInitView()
  },
  updateAimingRect: function() {
    var _this = this
    var rect = _this._getViewRange()
    _this._aimingRect.setBounds(rect)
  },
  updatemarker: function(mk, flag) { //* ******更新点的关键方法
    console.log('跟新了鹰眼上的点')
    if (flag) { // flag表示是否新建
      console.log('flag表示是否新建')
      var viewIcon = L.icon({//* ********点的icon样式，根据需要修改
        // iconUrl: '../../static/img/sel2.png',
        iconUrl: '../assets/img/sel2.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -13]
      })
      if (this.marker != null) {
        this._miniMap.removeLayer(this.marker)
        this.marker = null
      }
      //* *******下面的title可以修改或者去掉
      this.marker = new L.Marker(mk, { icon: viewIcon, title: '当前位置' }).addTo(this._miniMap)
    } else { // flag为false表示清空鹰眼里新建的点
      console.log('flag为false表示清空鹰眼里新建的点')
      if (this.marker != null) {
        this._miniMap.removeLayer(this.marker)
        this.marker = null
      }
    }
  },
  updatelines: function(ls, bd, flag) {
    if (this.linesgroup != null) {
      this.linesgroup.clearLayers()
    }
    if (flag) { // true表示要画线，如果问false表示清空所有的线
      this.ispatrol = true
      var linelayers = []
      if (ls != null && ls.length > 0) {
        for (var i = 0; i < ls.length; i++) {
          //* *******color可以修改颜色，也可以自己再加线宽
          var polyline = L.polyline(ls[i], { color: 'red' })// .addTo(_this._miniMap);
          linelayers.push(polyline)
        }
        this.linesgroup = L.layerGroup(linelayers)
        this._miniMap.addLayer(this.linesgroup)
      }
      var west = bd[1]
      var north = bd[0]
      var east = bd[3]
      var south = bd[2]
      var rect = new L.LatLngBounds(
        new L.LatLng(north, west),
        new L.LatLng(south, east)
      )
      this._viewerMoving = true
      this._miniMap.fitBounds(rect)
      this._setDisplay(this._decideMinimized())
      // this._aimingRect.setBounds(rect);
    }
  },
  _update: function() {
    // hqj增加偏移支持 start
    if (!this._map) { return }
    var map = this._map
    var bounds = map.getPixelBounds()
    var zoom = map.getZoom()
    var tileSize = this._getTileSize()
    var sw = map.unproject(bounds.getBottomLeft()); var // 获取左下角经纬度
      ne = map.unproject(bounds.getTopRight())// 获取右上角经纬度
    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
      return
    }
    var offsetX = this.options.offsetX// 经度偏移量
    var offsetY = this.options.offsetY// 纬度偏移量
    if (offsetX != null && offsetY != null) {
      sw = new L.LatLng(sw.lat - parseFloat(offsetY), sw.lng - parseFloat(offsetX))// 增加偏移量
      ne = new L.LatLng(ne.lat - parseFloat(offsetY), ne.lng - parseFloat(offsetX))

      var swPoint = map.project(sw)// 将经纬度进行投影
      var nePoint = map.project(ne)

      bounds = L.bounds(swPoint, nePoint)
    }
    var tileBounds = L.bounds(
      bounds.min.divideBy(tileSize)._floor(),
      bounds.max.divideBy(tileSize)._floor())

    this._addTilesFromCenterOut(tileBounds)

    if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
      this._removeOtherTiles(tileBounds)
    }
    // hqj增加偏移支持 end

    /* if (!this._map) { return; }

             var map = this._map,
                 bounds = map.getPixelBounds(),
                 zoom = map.getZoom(),
                 tileSize = this._getTileSize();

             if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
                 return;
             }

             var tileBounds = L.bounds(
                     bounds.min.divideBy(tileSize)._floor(),
                     bounds.max.divideBy(tileSize)._floor());

             this._addTilesFromCenterOut(tileBounds);

             if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
                 this._removeOtherTiles(tileBounds);
             }*/
  },
  _addTile: function(tilePoint, container) {
    var tilePos = this._getTilePos(tilePoint)
    // hqj增加偏移支持 start
    var offsetX = this.options.offsetX
    var offsetY = this.options.offsetY

    if (offsetX != null && offsetY != null) {
      var latLng = this._map.layerPointToLatLng(tilePos)
      tilePos = this._map.latLngToLayerPoint(new L.LatLng(latLng.lat + parseFloat(offsetY), latLng.lng + parseFloat(offsetX)))
    }
    // hqj增加偏移支持 end
    // get unused tile - or create a new tile
    var tile = this._getTile()
    /*
     Chrome 20 layouts much faster with top/left (verify with timeline, frames)
     Android 4 browser has display issues with top/left and requires transform instead
     (other browsers don't currently care) - see debug/hacks/jitter.html for an example
     */
    L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome)

    this._tiles[tilePoint.x + ':' + tilePoint.y] = tile

    this._loadTile(tile, tilePoint)

    if (tile.parentNode !== this._tileContainer) {
      container.appendChild(tile)
    }
  },
  _initMap: function() {
    var _this = this

    this._container.style.width = this.options.width + 'px'
    this._container.style.height = this.options.height + 'px'

    L.DomEvent.disableClickPropagation(_this._container)
    L.DomEvent.on(_this._container, 'mousewheel', L.DomEvent.stopPropagation)

    var mapOptions = {
      attributionControl: false,
      dragging: false,
      zoomControl: false,
      zoomAnimation: false,
      autoToggleDisplay: _this.options.autoToggleDisplay,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      crs: L.CRS.EPSG3857,
      center: [30, 120],
      zoom: 1
    }
    mapOptions = L.Util.extend(_this.options.mapOptions, mapOptions) // merge
    // with
    // priority
    // of
    // the
    // local
    // mapOptions
    // object.

    _this._miniMap = new L.Map(_this._container, mapOptions)

    var layer = this.tileLayer
    _this._miniMap.addLayer(layer)

    // These bools are used to prevent infinite loops of the two maps
    // notifying each other that they've moved.
    _this._viewerMoving = true
    _this._miniMapMoving = false

    // Keep a record of _this to prevent auto toggling when the user
    // explicitly doesn't want it.
    _this._userToggledDisplay = false
    _this._minimized = false

    if (this.options.toggleDisplay) {
      this._addToggleButton()
    }

    _this._miniMap.whenReady(L.Util.bind(function() {
      var bounds = _this._getViewRange()
      _this._aimingRect = L.rectangle(bounds, _this.options.aimingRectOptions).addTo(_this._miniMap)
      _this._shadowRect = L.rectangle(bounds, _this.options.shadowRectOptions).addTo(_this._miniMap)

      var camera = _this.viewer.scene.camera
      camera.moveEnd.addEventListener(function(e) {
        // alert(_this.ispatrol)
        if (_this.ispatrol === false) {
          var rect = _this._getViewRange()
          if (!_this._miniMapMoving) {
            _this._viewerMoving = true
            var zrect = _this._getZoomOutRange(rect)
            if (zrect) {
              _this._miniMap.fitBounds(zrect)
              _this._setDisplay(_this._decideMinimized())
            }
          } else {
            _this._miniMapMoving = false
          }
          if (zrect) {
            _this._aimingRect.setBounds(rect)
          }
        }
      })
      camera.moveStart.addEventListener(function(e) {
        // alert(_this.ispatrol)
        if (_this.ispatrol === false) {
          var rect = _this._getViewRange()
          _this._aimingRect.setBounds(rect)
        }
      })
    }, _this))

    return _this._container
  },
  _addToggleButton: function() {
    this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton(
      '', this._toggleButtonInitialTitleText(), ('leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-' +
                this.options.position), this._container, this._toggleDisplayButtonClicked, this) : undefined
    // this._toggleDisplayButton.style.zIndex = 99999;
    this._toggleDisplayButton.style.width = this.options.collapsedWidth + 'px'
    this._toggleDisplayButton.style.height = this.options.collapsedHeight + 'px'
  },
  _toggleButtonInitialTitleText: function() {
    if (this.options.minimized) {
      return this.options.strings.showText
    } else {
      return this.options.strings.hideText
    }
  },

  _createButton: function(html, title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container)
    link.innerHTML = html
    link.href = '#'
    link.title = title

    var stop = L.DomEvent.stopPropagation

    L.DomEvent
      .on(link, 'click', stop)
      .on(link, 'mousedown', stop)
      .on(link, 'dblclick', stop)
      .on(link, 'click', L.DomEvent.preventDefault)
      .on(link, 'click', fn, context)

    return link
  },

  _toggleDisplayButtonClicked: function() {
    this._userToggledDisplay = true
    if (!this._minimized) {
      this._minimize()
    } else {
      this._restore()
    }
  },
  _showInitView: function() {
    var rect = this._getViewRange()
    var zrect = this._getZoomOutRange(rect)
    if (zrect) { this._miniMap.fitBounds(zrect) }
  },
  _setDisplay: function(minimize) {
    if (minimize !== this._minimized) {
      if (!this._minimized) {
        this._minimize()
      } else {
        this._restore()
      }
    }
  },
  _minimize: function() {
    // hide the minimap
    if (this.options.toggleDisplay) {
      this._container.style.width = this.options.collapsedWidth + 'px'
      this._container.style.height = this.options.collapsedHeight + 'px'
      this._toggleDisplayButton.className += (' minimized-' + this.options.position)
      this._toggleDisplayButton.title = this.options.strings.showText
    } else {
      this._container.style.display = 'none'
    }
    this._minimized = true
    this._onToggle()
  },
  _restore: function() {
    if (this.options.toggleDisplay) {
      this._container.style.width = this.options.width + 'px'
      this._container.style.height = this.options.height + 'px'
      this._toggleDisplayButton.className = this._toggleDisplayButton.className
        .replace('minimized-' + this.options.position, '')
      this._toggleDisplayButton.title = this.options.strings.hideText
    } else {
      this._container.style.display = 'block'
    }
    this._minimized = false
    this._onToggle()
  },
  _onMiniMapMoveStarted: function(e) {
    if (!this.options.centerFixed) {
      var lastAimingRect = this._aimingRect.getBounds()
      var sw = this._miniMap.latLngToContainerPoint(lastAimingRect.getSouthWest())
      var ne = this._miniMap.latLngToContainerPoint(lastAimingRect.getNorthEast())
      this._lastAimingRectPosition = { sw: sw, ne: ne }
    }
  },
  _onMiniMapMoving: function(e) {
    if (!this.options.centerFixed) {
      if (!this._viewerMoving && this._lastAimingRectPosition) {
        this._shadowRect.setBounds(new L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne)))
        this._shadowRect.setStyle({ opacity: 1, fillOpacity: 0.3 })
      }
    }
  },
  _onMiniMapMoved: function(e) {
    if (!this._viewerMoving) {
      this._miniMapMoving = true

      var rect = this._shadowRect.getBounds()
      var west = rect.getWest()
      var east = rect.getEast()
      var north = rect.getNorth()
      var south = rect.getSouth()
      var destination = Cesium.Rectangle.fromDegrees(west, south, east, north)
      var orientation = {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
      }
      this.viewer.scene.camera.setView({
        destination: destination,
        orientation: orientation
      })
      this._shadowRect.setStyle({ opacity: 0, fillOpacity: 0 })
    } else {
      this._viewerMoving = false
    }
  },
  _isZoomLevelFixed: function() {
    var zoomLevelFixed = this.options.zoomLevelFixed
    return this._isDefined(zoomLevelFixed) && this._isInteger(zoomLevelFixed)
  },
  _decideMinimized: function() {
    if (this._userToggledDisplay) {
      return this._minimized
    }

    if (this.options.autoToggleDisplay) {
      var bounds = this._getViewRange()
      if (bounds.contains(this._miniMap.getBounds())) {
        return true
      }
      return false
    }

    return this._minimized
  },
  _isInteger: function(value) {
    return typeof value === 'number'
  },
  _isDefined: function(value) {
    return typeof value !== 'undefined'
  },
  _onToggle: function() {
    L.Util.requestAnimFrame(function() {
      L.DomEvent.on(this._container, 'transitionend', this._fireToggleEvents, this)
      if (!L.Browser.any3d) {
        L.Util.requestAnimFrame(this._fireToggleEvents, this)
      }
    }, this)
  },
  _fireToggleEvents: function() {
    L.DomEvent.off(this._container, 'transitionend', this._fireToggleEvents, this)
  },
  _getViewRange: function() {
    /* var viewer = this.viewer
    var camera = viewer.scene.camera
    var range = camera.computeViewRectangle()
    var west = range.west / Math.PI * 180
    var east = range.east / Math.PI * 180
    var north = range.north / Math.PI * 180
    var south = range.south / Math.PI * 180
    var bounds = new L.LatLngBounds(
      new L.LatLng(north, west),
      new L.LatLng(south, east)
    ) */
    var bounds = null
    var viewer = this.viewer
    var camera = viewer.scene.camera
    var range = camera.computeViewRectangle()
    if (range) {
      var west = range.west / Math.PI * 180
      var east = range.east / Math.PI * 180
      var north = range.north / Math.PI * 180
      var south = range.south / Math.PI * 180
      bounds = new L.LatLngBounds(
        new L.LatLng(north, west),
        new L.LatLng(south, east)
      )
    }
    return bounds
  },
  _getZoomOutRange: function(rect) {
    /* var west = rect.getWest()
    var east = rect.getEast()
    var north = rect.getNorth()
    var south = rect.getSouth()
    var factor = 3.0
    var xdis = Math.abs(east - west)
    var ydis = Math.abs(north - south)
    var xoff = xdis * (factor - 1) / 2.0
    var yoff = ydis * (factor - 1) / 2.0
    west -= xoff
    east += xoff
    north += yoff
    south -= yoff
    if (west < -180) {
      west = -180
    }
    if (east > 180) {
      east = 180
    }
    if (north > 90) {
      north = 90
    }
    if (south < -90) {
      south = -90
    }
    var bounds = new L.LatLngBounds(
      new L.LatLng(north, west),
      new L.LatLng(south, east)
    ) */
    var bounds = null
    if (rect) {
      var west = rect.getWest()
      var east = rect.getEast()
      var north = rect.getNorth()
      var south = rect.getSouth()
      var factor = 3.0
      var xdis = Math.abs(east - west)
      var ydis = Math.abs(north - south)
      var xoff = xdis * (factor - 1) / 2.0
      var yoff = ydis * (factor - 1) / 2.0
      west -= xoff
      east += xoff
      north += yoff
      south -= yoff//* *********去掉这几句，可以使红色矩形框大一些
      if (west < -180) {
        west = -180
      }
      if (east > 180) {
        east = 180
      }
      if (north > 90) {
        north = 90
      }
      if (south < -90) {
        south = -90
      }
      bounds = new L.LatLngBounds(
        new L.LatLng(north, west),
        new L.LatLng(south, east)
      )
    }
    return bounds
  }
}
export default CesiumOverviewMapControl

