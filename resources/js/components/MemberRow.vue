<template>
    <tr class="border-b text-sm">
        <th class="hidden">{{ member.id }}</th>
        <td class="p-3">
            <img
                :src="`/storage/${member.photo}`"
                :alt="member.full_name"
                class="h-10 w-10 object-cover rounded-full"
            />
        </td>
        <td class="p-3 break-words max-w-[200px]">{{ member.full_name }}</td>
        <td class="p-3 break-words max-w-[200px]">
            {{ member.report_subject }}
        </td>
        <td class="p-3 break-all max-w-[200px]">
            <a
                :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`"
                target="_blank"
                class="text-blue-600 hover:underline"
            >
                {{ member.email }}
            </a>
        </td>
        <td v-if="isAdmin" class="p-3 whitespace-nowrap">
            <button
                @click.prevent="$emit('edit', member)"
                class="underline text-orange-600"
            >
                Edit
            </button>
        </td>
        <td v-if="isAdmin" class="p-3 whitespace-nowrap">
            <button
                @click="$emit('delete', member.id)"
                class="underline text-red-600"
            >
                Delete
            </button>
        </td>
        <td v-if="isAdmin" class="p-3 whitespace-nowrap">
            <button
                @click="$emit('toggle', member)"
                :class="member.visibility ? 'text-green-600' : 'text-gray-400'"
                class="underline"
            >
                {{ member.visibility ? "Visible" : "Hidden" }}
            </button>
        </td>
    </tr>
</template>

<script setup>
const props = defineProps({
    member: Object,
    isAdmin: Boolean,
});

const emit = defineEmits(["edit", "delete", "toggle"]);
</script>
