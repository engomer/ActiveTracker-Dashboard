<template>
    <v-item-group mandatory style="height: 500px; width: 100%">
        <div class="display-3 text-center flex-grow-1 d-flex"  v-for="n in 4" :key="n">
            <component v-if="model == n-1" v-bind:is="section_list[n-1]"></component> 
        </div>
        <v-container>
            <v-row>
                <v-col
                v-for="n in 4"
                :key="n"
                cols="12"
                md="3"
                v-model="model"
                >
                    <v-item v-slot="{ active, toggle }">
                        <v-card
                        :class="active ? 'itemactive' : 'zehraninbuldugurenk'"
                        class="d-flex align-center cardtext--text"
                        height="150"
                        @click="toggle"
                        v-on:click="model = n-1"
                        >
                            <component v-bind:is="component_list[n-1]"></component>  
                            <v-scroll-y-transition>
                                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
                            </v-scroll-y-transition>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-container>
  </v-item-group>
</template>
 
<script>
import Temperature from '@/components/items/Temperature.vue'
import Humidity from '@/components/items/Humidity.vue'
import IMU from '@/components/items/IMU.vue'
import Location from '@/components/items/Location.vue'

import s_temperature from '@/components/sections/Temperature.vue'
import s_humidity from '@/components/sections/Humidity.vue'
import s_imu from '@/components/sections/IMU.vue'
import s_location from '@/components/sections/Location2.vue'

export default {
    name: 'Items',
    components: {
        Temperature,
        Humidity,
        IMU,
        Location,
        s_temperature,
        s_humidity,
        s_imu,
        s_location
    },
    
    data() {
        return{
            component_list: ['Temperature','Humidity','IMU','Location'],
            section_list: ['s_temperature','s_humidity','s_imu','s_location'],
            model: 0,
            theme: {
                themes:
                {
                    light: {
                        primary: '#EB8300',
                        buton_col: '#24D5D6'
                    },
                    dark: {
                        primary: '#EB8300',
                        buton_col: '#24D5D6'
                    }
                }
        
            },
        }
    }
}
</script>