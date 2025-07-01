<template>
    <Map v-if="showMap"></Map>
    <Logout v-if="isAdmin"/>
    <router-view :errors="errors" :is-admin="isAdmin"/>
</template>


<script setup>
import {reactive, provide, ref, computed} from 'vue'
import Logout from "./Admin/Logout.vue";
import Map from "./Map/Map.vue";
import {useRoute} from "vue-router";

const errors = reactive({})

const isAdmin = ref(!!localStorage.getItem('token'))

function clearErrors() {
    Object.keys(errors).forEach(key => {
        delete errors[key]
    })
}

function showErrors(newErrors) {
    clearErrors()
    for (const [key, message] of Object.entries(newErrors)) {
        errors[key] = message[0]
    }
}

const route = useRoute()

const mapRoutes = ['first.step', 'second.step', 'third.step']

const showMap = computed(() => {
    return mapRoutes.includes(route.name)
})

provide('showErrors', showErrors)
provide('clearErrors', clearErrors)
provide('isAdmin', isAdmin)
</script>

