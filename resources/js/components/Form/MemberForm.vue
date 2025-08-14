<template>
    <KeepAlive>
        <component
            :is="currentStep"
            :update="update"
            :errors="errors"
            @next="nextStep"
            @prev="prevStep"
            :data-testid="currentTestId"
        />
    </KeepAlive>
</template>

<script setup>
import FirstStep from "./Pages/FirstStep.vue";
import SecondStep from "./Pages/SecondStep.vue";
import ThirdStep from "./Pages/ThirdStep.vue";
import {computed, onMounted, ref, watch} from "vue";
import {createFormData} from "../../helpers/request.js";
import {useErrorStore} from "../../stores/errorStore.js";
import axios from "axios";

const errorStore = useErrorStore();
const errors = errorStore.errors;

const currentStep = computed(() => steps[currentIndex.value].component);
const currentTestId = computed(() => steps[currentIndex.value].testId);

const currentIndex = ref(0);

const steps = [
  { component: FirstStep, testId: 'firstStep' },
  { component: SecondStep, testId: 'secondStep' },
  { component: ThirdStep, testId: 'thirdStep' }
];

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
        errorStore.clearErrors();
        return currentIndex.value++;
    }
}

function prevStep() {
    if (currentIndex.value > 0) {
        errorStore.clearErrors();
        return currentIndex.value--;
    }
}

async function update(data) {
    const formData = createFormData(data);
    formData.append("_method", "patch");

    try {
        return await axios.post(`/api/members/${data.id}`, formData);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errorStore.showErrors(error.response.data.errors);
        }
    }
}
</script>
