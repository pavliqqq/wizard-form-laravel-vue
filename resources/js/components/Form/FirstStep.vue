<template>
    <div class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6">
            To participate in the conference, please fill out the form
        </h2>

        <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <BaseInput
                    name="first_name"
                    placeholder="First Name"
                    v-model="formData.firstName"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="last_name"
                    placeholder="Last Name"
                    v-model="formData.lastName"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BirthdateInput
                    v-model="formData.birthdate"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="report_subject"
                    placeholder="Report Subject"
                    v-model="formData.reportSubject"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <PhoneInput
                    v-model:phone="formData.phone"
                    v-model:country="formData.country"
                    :key="renderKey"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="email"
                    placeholder="Email"
                    v-model="formData.email"
                    :errors="errors"
                />
            </div>
        </div>

        <div class="text-right pt-6">
            <button
                @click.prevent="addMember"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>

import PhoneInput from "../CountryPhoneInput/CountryPhoneInput.vue"
import BaseInput from "../UI/Form/BaseInput.vue";
import BirthdateInput from "../UI/Form/BirthdateInput.vue";
import {ref, onMounted} from 'vue'
import router from "../../router.js";
import {toSnakeCase} from "../../utils/caseConverter.js";
import {useErrorStore} from "../../stores/errorStore.js";

const errorStore = useErrorStore()
const errors = errorStore.errors

const formData = ref({
    firstName: '',
    lastName: '',
    birthdate: '',
    reportSubject: '',
    country: '',
    phone: '',
    email: ''
});

const renderKey = ref(0)

onMounted(() => {
    errorStore.clearErrors()

    const saved = localStorage.getItem('firstStep')
    if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(formData.value, parsed)

        renderKey.value++
    }
})

async function addMember() {
    localStorage.setItem('firstStep', JSON.stringify(formData.value))

    const value = toSnakeCase(formData.value);
    try {
        const res = await axios.post('/api/members/first', value);

        localStorage.setItem('id', res.data.id);
        await router.push({name: 'second.step'});
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errorStore.showErrors(error.response.data.errors);
        }
    }
}
</script>
