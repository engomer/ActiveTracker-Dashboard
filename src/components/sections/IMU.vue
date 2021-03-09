

<template>
  <v-container>
    <div id="chart" style="height: 500px; width: 100%"></div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import ApexCharts from 'apexcharts'
import store from '@/store.js'
export default {
    name: 'Humidity',
    data() {
        return{
        }
    },
    mounted() {
    axios
      .get(store.api_requests.imu + localStorage.user)
      .then(response => {
        var gyrox = [];
        var gyroy = [];
        var gyroz = [];
        var accx = [];
        var accy = [];
        var accz = [];
        var date = [];
        var datagx = [];
        var datagy = [];
        var datagz = [];
        var dataax = [];
        var dataay = [];
        var dataaz = [];
        for (var i = 0; i < response.data.length; i++) {
        gyrox[i] = response.data[i]['gyrox'];
        gyroy[i] = response.data[i]['gyroy'];
        gyroz[i] = response.data[i]['gyroz'];
        accx[i] = response.data[i]['accx'];
        accy[i] = response.data[i]['accy'];
        accz[i] = response.data[i]['accz'];
        date[i] = response.data[i]['date'];
        date[i] = date[i].replace("/","-");
        date[i] = date[i].replace("/","-");
        date[i] = date[i] + " " + response.data[i]['time'];
        datagx[i] = new Array(2);
        datagx[i][0] = new Date(date[i]).getTime();
        datagx[i][1] = gyrox[i];
        datagy[i] = new Array(2);
        datagy[i][0] = new Date(date[i]).getTime();
        datagy[i][1] = gyroy[i];
        datagz[i] = new Array(2);
        datagz[i][0] = new Date(date[i]).getTime();
        datagz[i][1] = gyroz[i];
        dataax[i] = new Array(2);
        dataax[i][0] = new Date(date[i]).getTime();
        dataax[i][1] = accx[i];
        dataay[i] = new Array(2);
        dataay[i][0] = new Date(date[i]).getTime();
        dataay[i][1] = accy[i];
        dataaz[i] = new Array(2);
        dataaz[i][0] = new Date(date[i]).getTime();
        dataaz[i][1] = accz[i];

        }
        

        chart.updateSeries([
            {
                name: "Gyrox",
                data: datagx
            },
            {
                name: "Gyroy",
                data: datagy
            },
            {
                name: "Gyroz",
                data: datagz
            },
            {
                name: "Accx",
                data: dataax
            },
            {
                name: "Accy",
                data: dataay
            },
            {
                name: "Accz",
                data: dataaz
            }
            
        ])
         
      });
      var options = {
          series: [],
          chart: {
          height: 450,
          type: 'line',
          
        },
        colors: ['#F9FAA3','#E8FA9C','#C2FF82','#53EB2D','#64D16E','#87FAAE'],
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


