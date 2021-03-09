<template>

  <div style="height: 500px; width: 100%">
    <div v-if="loading==true">
      {{loading}}
    </div>
    <l-map
      @ready="loaded()"
      v-if="showMap"
      :zoom="zoom"
      :center=[39,32]
      :options="mapOptions"
      style="height: 100%"
    >
      <l-tile-layer
        :url="url"
      />

      <l-marker v-for="(mark,idx) in marker" :key="idx" :lat-lng="mark">
      </l-marker>
      <l-polyline :lat-lngs="travel" />
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Icon } from "leaflet";
import { LMap, LTileLayer, LPolyline, LMarker} from "vue2-leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker
  },
  data() {
    return {
      zoom: 6,
      center: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      travel: [],
      marker: [],
      icon: null,
      loading:true
      
    };
  },
  mounted() {
    var myIcon = L.divIcon({className: 'my-div-icon'});
    this.icon = myIcon;
    var latlong = [];
    var ma = [];
    const jsonn = require("@/route.json");
    var temp = jsonn.route;
    for (var i = 0; i < temp.length; i++) {

      latlong[i] = new Array(2);
      latlong[i][0] = parseFloat(temp[i][0]);
      latlong[i][1] = parseFloat(temp[i][1]);
      
    }
    ma[0] = L.latLng(latlong[0][0],latlong[0][1]);
    ma[1] = L.latLng(latlong[i-1][0],latlong[i-1][1]);
    this.travel = latlong;
    this.marker = ma; 
      
  },
  methods: {
    loaded() {
      this.loading = false;
    }
  }
};
</script>
