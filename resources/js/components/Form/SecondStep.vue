<template>
    <div class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6">
            To participate in the conference, please fill out the form
        </h2>

        <div class="space-y-4 mb-4">
            <div class="flex flex-col">
                <BaseInput
                    name="company"
                    placeholder="Company"
                    v-model="Data.company"
                    :errors="errors"
                />
            </div>

            <div class="flex flex-col">
                <BaseInput
                    name="position"
                    placeholder="Position"
                    v-model="Data.position"
                    :errors="errors"
                />
            </div>

            <div class="flex flex-col">
                <BaseTextArea
                    name="about_me"
                    placeholder="About Me"
                    v-model="Data.aboutMe"
                    :errors="errors"
                />
            </div>

            <div class="flex flex-col">
                <FileInput
                    name="photo"
                    v-model="Data.photo"
                    :maxSizeKb="500"
                    :errors="errors"
                />
            </div>
        </div>

        <div class="flex justify-between pt-2">
            <button
                @click="goToFirstStep"
                class="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition-colors duration-200">
                Back
            </button>

            <button
                @click.prevent="secondStepSubmit"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>

import {ref, inject, onMounted} from 'vue';
import router from "../../router.js";
import {toSnakeCase} from "../../utils/caseConverter.js";
import BaseInput from "../UI/Form/BaseInput.vue";
import BaseTextArea from "../UI/Form/BaseTextArea.vue";
import FileInput from "../UI/Form/FileInput.vue";

const showErrors = inject('showErrors');
const clearErrors = inject('clearErrors');

const {errors} = defineProps({errors: Object})

const Data = ref({
    id: '',
    company: '',
    position: '',
    aboutMe: '',
    photo: null,
});

function goToFirstStep() {
    router.push({name: 'first.step'});
}

onMounted(() => {
    clearErrors()
    const saved = localStorage.getItem('secondStep')
    if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(Data.value, parsed)
    }
})

async function secondStepSubmit() {
    if (Data.value.photo && errors.photo) {
        return;
    }

    Data.value.id = localStorage.getItem('id');
    localStorage.setItem('secondStep', JSON.stringify(Data.value))

    const plainData = {
        id: Data.value.id,
        company: Data.value.company,
        position: Data.value.position,
        aboutMe: Data.value.aboutMe,
    };

    const snakeCaseData = toSnakeCase(plainData);

    const sendFormData = new FormData();
    for (const [key, value] of Object.entries(snakeCaseData)) {
        sendFormData.append(key, value);
    }

    if (Data.value.photo instanceof File) {
        sendFormData.append('photo', Data.value.photo);
    }

    try {
        const res = await axios.post('/api/members/second', sendFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });

        localStorage.setItem('count', res.data.count);
        await router.push({name: 'third.step'});
    } catch (error) {
        if (error.response && error.response.status === 422) {
            showErrors(error.response.data.errors);
        }
    }
}
</script>
