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
        <l-popup>{{tmp_date[idx]}}</l-popup>
      </l-marker>
      <l-polyline :lat-lngs="travel" />
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import L from 'leaflet'
import { Icon } from "leaflet";
import { LMap, LTileLayer, LPolyline, LMarker, LPopup} from "vue2-leaflet";
import store from '@/store.js';
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
    LMarker,
    LPopup
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
      date_: [],
      tmp_date: [],
      marker: [],
      icon: null,
      loading:true
      
    };
  },
  mounted() {
    var myIcon = L.divIcon({className: 'my-div-icon'});
    this.icon = myIcon;
    var latlong = [];
    var date = [];
    var ma = [];
    axios
      .get(store.api_requests.loc + localStorage.user)
      .then(response => {
        
        for (var i = 0; i < response.data.length; i++) {
          date[i] = response.data[i]['date'];
          date[i] = date[i].replace("/","-");
          date[i] = date[i].replace("/","-");
          date[i] = date[i] + " " + response.data[i]['time'];
          latlong[i] = new Array(2);
          latlong[i][0] = parseFloat(response.data[i]['lattitude']);
          latlong[i][1] = parseFloat(response.data[i]['longtitude']);
        }
        ma[0] = L.latLng(latlong[0][0],latlong[0][1]);
        ma[1] = L.latLng(latlong[i-1][0],latlong[i-1][1]);
        var tmpDate = [];
        tmpDate[0] = date[0];
        tmpDate[1] = date[i-1];
        this.travel = latlong;
        this.date_ = date;
        this.marker = ma; 
        this.tmp_date = tmpDate;
      });
      
  },
  methods: {
    loaded() {
      this.loading = false;
    }
  }
};
</script>
