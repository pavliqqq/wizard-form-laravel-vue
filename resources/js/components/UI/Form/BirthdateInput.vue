<template>
    <BaseInput
        name="birthdate"
        type="date"
        :max="maxDate"
        v-model="model"
        :errors="errors"
    />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseInput from "./BaseInput.vue";

const maxDate = ref(null);

const props = defineProps({
    modelValue: String,
    errors: Object,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

onMounted(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    maxDate.value = today.toISOString().split("T")[0];
});
</script>
