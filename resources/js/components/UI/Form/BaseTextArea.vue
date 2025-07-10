<template>
    <textarea
        :name="name"
        :placeholder="placeholder"
        v-model="model"
        class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
    />
    <div v-if="error" class="text-red-600 text-sm mt-1">
        {{ error }}
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    name: String,
    placeholder: String,
    modelValue: String,
    errors: Object,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const error = computed(() => props.errors[props.name] ?? null);
</script>
