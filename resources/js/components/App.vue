<template>
    <Map></Map>
    <div id="app">
        <router-view></router-view>
    </div>
</template>


<script>
import Map from './Map.vue';
export default {
    name: 'App',

    components: {
        Map
    },
}
</script>


<style scoped>

</style>
