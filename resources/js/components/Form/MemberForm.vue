<template>
    <KeepAlive>
        <component :is="currentStep" @next="nextStep" @prev="prevStep" />
    </KeepAlive>
</template>

<script setup>
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";
import { computed, onMounted, ref, watch } from "vue";

const currentStep = computed(() => steps[currentIndex.value]);

const currentIndex = ref(0);

const steps = [FirstStep, SecondStep, ThirdStep];

onMounted(() => {
    const saved = parseInt(localStorage.getItem("currentStep"));
    if (!isNaN(saved) && saved >= 0 && saved < steps.length) {
        currentIndex.value = saved;
    }
});

watch(currentIndex, (newStep) => {
    localStorage.setItem("currentStep", newStep);
});
function nextStep() {
    if (currentIndex.value < steps.length - 1) {
        return currentIndex.value++;
    }
}

function prevStep() {
    if (currentIndex.value > 0) {
        return currentIndex.value--;
    }
}
</script>
