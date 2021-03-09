<template>
  <div class="dashboard myFont">
     
    <Navbar/>
    <Items/>
  </div>
</template>

<script>
// @ is an alias to /src

 
import Items from '@/components/Items.vue'
import Navbar from '@/components/Navbar.vue'
import store from '@/store.js'
export default {
  name: 'Dashboard',
  
  components: {
    Navbar,
    Items,
  },
  data() {
      return{
        s: store,
      }
  },
  mounted() {
  }
}
</script>