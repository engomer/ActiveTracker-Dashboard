

<template>
  <v-container>
    <div id="chart" style="height: 500px; width: 100%"></div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import ApexCharts from 'apexcharts'
import store from '@/store'
export default {
    name: 'Temperature',
    data() {
        return{
            temperature : [],
            date : [],
            time : [],
            data_t: []
        }
    },
    mounted() {
    axios
      .get(store.api_requests.temp + localStorage.user)
      .then(response => {
        var temp = [];
        var date = [];
        var datat = [];
        for (var i = 0; i < response.data.length; i++) {
        temp[i] = response.data[i]['temperature'];
        date[i] = response.data[i]['date'];
        date[i] = date[i].replace("/","-");
        date[i] = date[i].replace("/","-");
        date[i] = date[i] + " " + response.data[i]['time'];
        datat[i] = new Array(2);
        datat[i][0] = new Date(date[i]).getTime();
        datat[i][1] = temp[i];
        }
        
        this.temperature = temp;
        this.date = date;
        this.data_t = datat;

        chart.updateSeries([{
          name: "Temperature",
          data: this.data_t
            
        }])
         
      });
      var options = {
          series: [],
          chart: {
          height: 450,
          type: 'line',
        },
        colors: ['#2EFAF0'],
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Temperature',
        },
        noData: {
          text: 'Loading...'
        },
        xaxis: {
        type: 'datetime',
        tickAmount: 8,
        labels: {
            rotate: -15,
            rotateAlways: true,
            datetimeUTC: false
          }
        },
        tooltip: {
          x: {
            format: "yyyy/MM/dd HH:mm:ss"
          }
        }
        };


        var chart = new ApexCharts(document.querySelector("#chart"), options);

        chart.render();
    }
  
}



</script>


