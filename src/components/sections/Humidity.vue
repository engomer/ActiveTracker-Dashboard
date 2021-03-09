

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
    name: 'Humidity',
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
      .get(store.api_requests.hum + localStorage.user)
      .then(response => {
        var temp = [];
        var date = [];
        var datat = [];
        for (var i = 0; i < response.data.length; i++) {
        temp[i] = response.data[i]['humidity'];
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
          name: "Humidity",
          data: this.data_t
            
        }])
         
      });
      var options = {
          series: [],
          chart: {
          height: 450,
          type: 'line',
          
        },
        colors: ['#44FAB1'],
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Humidity',
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
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        }
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
  
}
</script>


