<template>
    <Map v-if="showMap"></Map>
    <div class="mt-3 mr-3 text-right">
        <LogoutButton v-if="isAdmin"/>
    </div>
    <router-view :is-admin="isAdmin"/>
</template>


<script setup>
import { provide, ref, computed} from 'vue'
import LogoutButton from "./Admin/LogoutButton.vue";
import Map from "./Map/Map.vue";
import {useRoute} from "vue-router";

const isAdmin = ref(!!localStorage.getItem('token'))

const route = useRoute()

const mapRoutes = ['first.step', 'second.step', 'third.step']

const showMap = computed(() => {
    return mapRoutes.includes(route.name)
})

provide('isAdmin', isAdmin)
</script>

