<template>
    <input
        ref="fileInput"
        :name="name"
        type="file"
        :accept="accept"
        @change="fileChange"
        :class="props.class || 'border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800'"
    />
    <div v-if="error" class="text-red-600 text-sm mt-1">
        {{ error }}
    </div>
</template>

<script setup>
import {computed, inject, ref} from "vue";

const showErrors = inject('showErrors');
const clearErrors = inject('clearErrors');

const fileInput = ref(null);

const props = defineProps({
    name: String,
    modelValue: null,
    maxSizeKb: Number,
    accept: {type: String, default: 'image/*'},
    class: String,
    errors: Object
})

const emit = defineEmits(['update:modelValue'])

function fileChange(event) {
    const file = event.target.files[0]

    if (!file) return;

    const maxSizeBytes = props.maxSizeKb * 1024

    if (file.size > maxSizeBytes) {
        showErrors({[props.name]: [`File must be less than ${props.maxSizeKb}Kb`]})
        fileInput.value.value = ''
        return
    }

    clearErrors()
    emit('update:modelValue', file)
}

const error = computed(() => props.errors[props.name] ?? null)
</script>
