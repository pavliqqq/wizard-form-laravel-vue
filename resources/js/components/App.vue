<template>
    <div id="app">
        <Map></Map>
        <FormComponent></FormComponent>
    </div>
</template>


<script>
import FormComponent from './FormComponent.vue';
import Map from "./Map.vue";

export default {
    name: 'App',

    components: {
        Map,
        FormComponent
    },
}
</script>


<style scoped>

</style>
