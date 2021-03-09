<template>
  <v-app class="myFont">
    

    <v-main>
      
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>



export default {
  name: 'App',

  components: {
    
  },
  

  data: () => ({
    
  }),
  
};
</script>

<style>
.myFont {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>