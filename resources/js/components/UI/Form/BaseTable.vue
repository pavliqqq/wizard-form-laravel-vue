<template>
    <table class="min-w-full border border-gray-300 rounded overflow-hidden table-auto">
        <thead class="bg-gray-100">
        <tr>
            <th
                v-for="(header, index) in headers"
                :key="index"
                class="p-3 text-left border-b text-sm text-gray-700"
            >
                {{ header }}
            </th>
        </tr>
        </thead>
        <tbody>
        <slot/>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    headers: Array
});
</script>
