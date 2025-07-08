<template>
    <tr class="border-b bg-white hover:bg-gray-50">
        <th class="hidden">{{ member.id }}</th>
        <td class="p-3">
            <label class="block w-12 h-12 relative">
                <img
                    :src="photoPreview || `/storage/${member.photo}`"
                    alt="photo"
                    class="w-12 h-12 object-cover rounded-full"
                />
                <FileInput
                    name="photo"
                    :modelValue="photo"
                    :maxSizeKb="500"
                    :class="'absolute inset-0 opacity-0'"
                    @update:modelValue="emit('update:photo', $event)"
                    :errors="errors"
                />
            </label>

        </td>
        <td class="p-3">
            <BaseInput
                name="fullName"
                :modelValue="fullName"
                @update:modelValue="emit('update:fullName', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3">
            <BaseInput
                name="reportSubject"
                :modelValue="reportSubject"
                @update:modelValue="emit('update:reportSubject', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3">
            <BaseInput
                name="email"
                :modelValue="email"
                @update:modelValue="emit('update:email', $event)"
                :errors="errors"
            />
        </td>
        <td class="p-3">
            <button
                class="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                @click="$emit('update', member.id)">
                Update
            </button>
        </td>
        <td class="p-3">
            <button
                class="ml-2 text-sm text-gray-500 hover:underline"
                @click="$emit('cancelEdit')">
                Cancel
            </button>
        </td>
    </tr>
</template>

<script setup>

import FileInput from "./UI/Form/FileInput.vue";
import BaseInput from "./UI/Form/BaseInput.vue";

const props = defineProps({
    member: Object,
    photo: null,
    photoPreview: null,
    fullName: String,
    reportSubject: String,
    email: String,
    errors: Object
})

const emit = defineEmits([
    'update:photo',
    'update:fullName',
    'update:reportSubject',
    'update:email',
    'update',
    'cancelEdit'
])

</script>
