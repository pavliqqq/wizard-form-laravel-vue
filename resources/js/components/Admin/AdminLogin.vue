<template>
    <div class="max-w-md mx-auto mt-20 mb-20 p-6 bg-white shadow rounded">
        <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>

        <form @submit.prevent="login" class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <BaseInput
                    placeholder="email"
                    v-model="formData.email"
                    :errors="errors"
                />
            </div>

            <div class="flex flex-col">
                <BaseInput
                    type="password"
                    placeholder="password"
                    v-model="formData.password"
                    :errors="errors"
                />
            </div>

            <div class="text-right pt-6">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>


<script setup>

import {ref} from "vue";
import router from "../../router.js";
import BaseInput from "../UI/Form/BaseInput.vue";
import {useErrorStore} from "../../stores/errorStore.js";

const errorStore = useErrorStore()
const errors = errorStore.errors

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
            errorStore.showErrors(error.response.data.errors)
        }
    }
}

</script>
