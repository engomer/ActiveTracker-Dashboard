<template>
    <v-container class="text-center">
        <p>Humidity</p>
        <div>
            {{humidity}} %<br/>
        </div>
    </v-container>
</template>



<script>
import axios from 'axios'
import store from '@/store'
export default {
    data(){
        return{
            humidity: null,
            date: null
        }

        
    },
    mounted() {
    axios
      .get(store.api_requests.hum + localStorage.user)
      .then(response => {
        var hum;
        var date;
        var rl = response.data.length-1;
        hum = response.data[rl]['humidity'];
        date = response.data[rl]['date'];
        date = date.replace("/","-");
        date = date.replace("/","-");
        date = date + " " + response.data[rl]['time'];
        
        
        this.humidity = hum;
        this.date = date;
         
      });
    }
}
</script>