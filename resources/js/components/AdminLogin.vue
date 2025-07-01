<template>
    <div class="max-w-md mx-auto mt-20 mb-20 p-6 bg-white shadow rounded">
        <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>

        <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <input
                    type="text"
                    placeholder="email"
                    v-model="formData.email"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.email" class="text-red-600 text-sm mt-1">
                    {{ errors.email }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    type="password"
                    placeholder="password"
                    v-model="formData.password"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.password" class="text-red-600 text-sm mt-1">
                    {{ errors.password }}
                </div>
            </div>
        </div>

        <div class="text-right pt-6">
            <button
                @click.prevent="login"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                Login
            </button>
        </div>
    </div>
</template>


<script setup>

import {inject, ref} from "vue";
import router from "../router.js";

const showErrors = inject('showErrors')
const isAdmin = inject('isAdmin')

const props = defineProps({
    errors: Object
});

const formData = ref({
    email: '',
    password: '',
})

async function login() {
    try {
        const res = await axios.post('/api/admin/login', formData.value)

        localStorage.setItem('token', res.data.token)
        isAdmin.value = true
        await router.push({name: 'all.members'})
    } catch (error) {
        if (error.response && error.response.status === 422) {
            showErrors(error.response.data.errors)
        }
    }
}

</script>


<style scoped>

</style>
