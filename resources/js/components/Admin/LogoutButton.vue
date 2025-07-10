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

async function logout() {
    try {
        await axios.post("/api/admin/logout", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    } catch (e) {
        console.error("Logout failed:", e);
    }
    localStorage.removeItem("token");
    router.go(0);
}
</script>
