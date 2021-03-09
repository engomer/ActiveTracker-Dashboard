<template>
    <v-container class="text-center">
        <p>Temperature</p>
        <div>
            {{temperature}} &#176;C<br/>
        </div>
    </v-container>
</template>


<script>
import axios from 'axios'
import store from '@/store'
export default {
    data(){
        return{
            temperature: null,
            date: null
        }

        
    },
    mounted() {
    axios
      .get(store.api_requests.temp + localStorage.user)
      .then(response => {
        var temp;
        var date;
        var rl = response.data.length-1;
        temp = response.data[rl]['temperature'];
        date = response.data[rl]['date'];
        date = date.replace("/","-");
        date = date.replace("/","-");
        date = date + " " + response.data[rl]['time'];
        
        
        this.temperature = temp;
        this.date = date;
         
      });
    }
}
</script>