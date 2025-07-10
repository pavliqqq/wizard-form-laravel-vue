<template>
    <input
        ref="fileInput"
        :name="name"
        type="file"
        :accept="accept"
        @change="fileChange"
        :class="
            props.class ||
            'border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800'
        "
    />
    <div v-if="error" class="text-red-600 text-sm mt-1">
        {{ error }}
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useErrorStore } from "../../../stores/errorStore.js";

const errorStore = useErrorStore();
const errors = errorStore.errors;

const fileInput = ref(null);

const props = defineProps({
    name: String,
    modelValue: null,
    maxSizeKb: Number,
    accept: { type: String, default: "image/*" },
    class: String,
});

const emit = defineEmits(["update:modelValue"]);

function fileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const maxSizeBytes = props.maxSizeKb * 1024;

    if (file.size > maxSizeBytes) {
        errorStore.showErrors({
            [props.name]: [`File must be less than ${props.maxSizeKb}Kb`],
        });
        fileInput.value.value = "";
        return;
    }

    errorStore.clearErrors();
    emit("update:modelValue", file);
}

const error = computed(() => errors[props.name] ?? null);
</script>
