<template>
    <div class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <div class="text-right">
            <h3 class="text-lg font-semibold mb-4">Share the event:</h3>
            <div class="flex gap-4 justify-end mb-4">
                <a
                    :href="facebookUrl"
                    target="_blank"
                    class="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Share on Facebook
                </a>
                <a
                    :href="twitterUrl"
                    target="_blank"
                    class="bg-blue-400 text-white px-4 py-2 rounded"
                >
                    Share on Twitter
                </a>
            </div>
        </div>

        <div class="flex justify-between items-center mt-6">
            <button
                type="button"
                @click="startOver"
                class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors duration-200"
            >
                Start over
            </button>
            <a
                href="#"
                @click.prevent="goToAllMembers"
                class="text-blue-600 underline"
            >
                All members ({{ count }})
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "../../router.js";

const count = ref(null);
const facebookUrl = ref(null);
const twitterUrl = ref(null);

onMounted(() => {
    getFbTwUrl();
    count.value = localStorage.getItem("count");
});

function startOver() {
    localStorage.clear();
    router.go(0);
}

function goToAllMembers() {
    router.push({ name: "all.members" });
}

async function getFbTwUrl() {
    try {
        const res = await axios.get("/api/members/share");
        facebookUrl.value = res.data.facebookUrl;
        twitterUrl.value = res.data.twitterUrl;
    } catch (e) {
        console.error("Failed to load URLs", e);
    }
}
</script>
