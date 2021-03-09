<template>
    <div class="device myFont">
        <Navbar/>
        <Metadata/>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Metadata from '@/components/user_area/Device.vue'
export default {
    name: "Device",
    components: {
        Navbar,
        Metadata
    }
}
</script>