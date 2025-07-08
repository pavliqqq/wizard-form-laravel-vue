<template>
    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 rounded overflow-hidden table-fixed">
            <thead class="bg-gray-100">
            <tr>
                <th
                    v-for="(header, index) in headers"
                    :key="index"
                    class="p-3 text-left border-b truncate whitespace-nowrap"
                >
                    {{ header }}
                </th>
            </tr>
            </thead>
            <tbody>
            <slot/>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    defineProps({
        headers: Array
    });
</script>
