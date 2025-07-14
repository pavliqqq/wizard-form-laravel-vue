<template>
    <button
        @click="logout"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        type="button"
    >
        Logout
    </button>
</template>

<script setup>
import router from "../../router.js";
import { useAdminStore } from "../../stores/adminStore.js";

const adminStore = useAdminStore();
async function logout() {
    try {
        await axios.get("/sanctum/csrf-cookie");

        await axios.post("/api/logout", null);

        adminStore.reset();

        router.go(0);
    } catch (e) {
        console.error("Logout failed:", e);
    }
}
</script>
