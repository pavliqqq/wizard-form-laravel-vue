<template>
    <tr class="border-b bg-white hover:bg-gray-50 text-sm">
        <th class="hidden">{{ memberId }}</th>
        <td class="p-3">
            <label class="block w-10 h-10 relative">
                <img
                    :src="photoPreview || `/storage/${memberPhoto}`"
                    alt="photo"
                    class="h-10 w-10 object-cover rounded-full"
                    data-testid="photo-img"
                />
                <FileInput
                    name="photo"
                    :modelValue="photo"
                    :maxSizeKb="500"
                    :class="'absolute inset-0 opacity-0'"
                    @update:modelValue="emit('update:photo', $event)"
                />
            </label>
        </td>
        <td class="p-3 break-words max-w-[200px]">
            <BaseInput
                name="full_name"
                :modelValue="fullName"
                @update:modelValue="emit('update:fullName', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3 break-words max-w-[200px]">
            <BaseInput
                name="report_subject"
                :modelValue="reportSubject"
                @update:modelValue="emit('update:reportSubject', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3 break-words max-w-[200px]">
            <BaseInput
                name="email"
                :modelValue="email"
                @update:modelValue="emit('update:email', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3 whitespace-nowrap">
            <button
                class="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                @click="$emit('update', memberId)"
                data-testid="updateButton"
            >
                Update
            </button>
        </td>
        <td class="p-3 whitespace-nowrap">
            <button
                class="ml-2 text-sm text-gray-500 hover:underline"
                @click="$emit('cancelEdit')"
                data-testid="cancelButton"
            >
                Cancel
            </button>
        </td>
    </tr>
</template>

<script setup>
import FileInput from "./FileInput.vue";
import BaseInput from "./BaseInput.vue";

const props = defineProps({
    memberId: Number,
    memberPhoto: String,
    photo: null,
    photoPreview: null,
    fullName: String,
    reportSubject: String,
    email: String,
    errors: Object,
});

const emit = defineEmits([
    "update:photo",
    "update:fullName",
    "update:reportSubject",
    "update:email",
    "update",
    "cancelEdit",
]);
</script>
