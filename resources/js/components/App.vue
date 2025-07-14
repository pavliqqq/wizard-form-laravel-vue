<template>
    <div id="app">
        <Map v-if="showMap"></Map>
        <div class="mt-3 mr-3 text-right">
            <LogoutButton v-if="adminStore.isAdmin" />
        </div>
        <router-view />
    </div>
</template>

<script setup>
import { computed } from "vue";
import LogoutButton from "./Admin/LogoutButton.vue";
import Map from "./Map/Map.vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "../stores/adminStore.js";

const adminStore = useAdminStore();

const route = useRoute();

const mapRoute = "member.form";

const showMap = computed(() => {
    return mapRoute === route.name;
});
</script>
