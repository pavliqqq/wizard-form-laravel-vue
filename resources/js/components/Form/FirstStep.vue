<template>
    <div class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6" id="form_title">
            To participate in the conference, please fill out the form
        </h2>

        <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    v-model="formData.first_name"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.first_name" class="text-red-600 text-sm mt-1">
                    {{ errors.first_name }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    v-model="formData.last_name"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.last_name" class="text-red-600 text-sm mt-1">
                    {{ errors.last_name }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    name="birthdate"
                    type="date"
                    v-model="formData.birthdate"
                    id="birthdate"
                    :max=birthdate
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.birthdate" class="text-red-600 text-sm mt-1">
                    {{ errors.birthdate }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    name="report_subject"
                    type="text"
                    placeholder="Report Subject"
                    v-model="formData.report_subject"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.report_subject" class="text-red-600 text-sm mt-1">
                    {{ errors.report_subject }}
                </div>
            </div>

            <PhoneInput
                v-model:phone="formData.phone"
                v-model:country="formData.country"
                v-model:phoneValid="formData.phone_valid"
                :key="renderKey"
                :errors="errors"
            />

            <div class="flex flex-col">
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    v-model="formData.email"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.email" class="text-red-600 text-sm mt-1">
                    {{ errors.email }}
                </div>
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

import PhoneInput from "../CountryPhoneInput.vue"
import {ref, inject, onMounted} from 'vue'
import router from "../../router.js";

const showErrors = inject('showErrors')
const clearErrors = inject('clearErrors')

const {errors} = defineProps({errors: Object})

const formData = ref({
    first_name: '',
    last_name: '',
    birthdate: '',
    report_subject: '',
    country: 'US',
    phone: '',
    phone_valid: false,
    email: ''
});

const birthdate = ref(null)
const renderKey = ref(0)

onMounted(() => {
    clearErrors()
    minBirthdate()

    const saved = localStorage.getItem('firstStep')
    if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(formData.value, parsed)

        renderKey.value++
    }
})

function minBirthdate() {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 16)
    birthdate.value = today.toISOString().split('T')[0]
}

async function addMember() {
    localStorage.setItem('firstStep', JSON.stringify(formData.value))
    try {
        const res = await axios.post('/api/members/first', formData.value);

        localStorage.setItem('id', res.data.id);
        await router.push({name: 'second.step'});
    } catch (error) {
        if (error.response && error.response.status === 422) {
            showErrors(error.response.data.errors);
        }
    }
}
</script>

<style>
</style>
