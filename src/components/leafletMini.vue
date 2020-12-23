<template>
  <div class="vue-leaflet">
    <l-map
      style="position: absolute; top: 110px; right: 10px; padding: 0px; width: 250px; height: 250px"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker">
        <l-popup :content="text" />
      </l-marker>
      <l-polygon :lat-lngs="viewRect" :color="viewRectColor" />
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LPolygon
} from 'vue2-leaflet'

export default {
  name: 'LeafletMini',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolygon
  },
  props: ['center', 'marker', 'zoom', 'viewRect'],
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      text: '光标的位置',
      viewRectColor: 'orange'
    }
  }
}
</script>
