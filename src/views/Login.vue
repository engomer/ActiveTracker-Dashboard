<template>
        
    <v-app justify-center class="myFont">
        <v-img src="@/assets/satellite_wp.png" height="100vh">
            <v-toolbar class="seradey">
            <v-container class="text-center white--text ma-md-3"><h2>Active Tracker v2</h2></v-container></v-toolbar>
            <v-container fill-height text-xs-center fluid>
                <v-layout row wrap align-center class="mt-n16" justify-center>
                    <v-card elevation="5" align-center rounded width="30%" class="toolbartextcolor">
                        <v-list-item class="ma-md-3">
                            <h1>Login</h1>
                        </v-list-item>
                        <v-list-item class="justify-center">
                            <v-text-field label="Username" v-model="username" type="username" name="username" class=" ma-md-4"/>
                        </v-list-item>
                        <v-list-item class="justify-center">
                            <v-text-field label="Password" v-model="password" type="password" class="ma-md-4"/>
                        </v-list-item>
                        <v-list-item class="ma-md-4" >
                            <v-btn @click="click();" class="btn primary">Login</v-btn>
                        </v-list-item>
                    </v-card>
                    <v-dialog v-model="pop" width="30%">
                        <v-card class="d-block">
                            <v-card-title>
                                Username or Password is wrong
                            </v-card-title>
                            <v-card-actions>
                                <v-row justify="center">
                                    <v-btn class="btn primary ma-4 pa-2" v-on:click="change_pop();">OK</v-btn>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>    
        </v-img>
    </v-app>

</template>

<script>
import store from '@/store.js';
import axios from 'axios';
export default {
    name: 'Login',
    data: () => ({
        username: null,
        password: null,
        pop: false,
        clicked: false
    }),
    methods: {
        change_pop()
        {
            this.pop = false;
        },
        click()
        {
            this.clicked = true;
        }
    },
    beforeCreate() {        
    },
    watch: {
        pop: function()
        {
            store.pop = this.pop;
        },
        clicked : async function()
        {
            axios
            .get("http://activetrackerv1.herokuapp.com/api/checkUser.php?user="+ this.username+ "&pwd=" + this.password)
            .then(response => {
                if(response.data == 1){
                    this.pop = false;
                    localStorage.user = this.username;
                    localStorage.password = this.password;
                    this.$router.push('/dashboard').catch(()=>{});
                    store.redirect = true;
                    localStorage.redirect = store.redirect;
                    
                }
                else{
                    this.pop = true;
                    store.redirect = false;
                    localStorage.redirect= store.redirect;
                }
            });
            this.clicked = false;
        }
    }
};
</script>
