<template>
    <div class="max-w-7xl mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded p-4 sm:p-6 max-w-md mx-auto">
            <h2 class="text-lg sm:text-xl text-center font-semibold mb-4">Login</h2>

            <form @submit.prevent="login" class="flex flex-col space-y-4">
                <div class="flex flex-col">
                    <BaseInput
                        name="email"
                        placeholder="email"
                        v-model="Data.email"
                        :errors="errors"
                    />
                </div>

                <div class="flex flex-col">
                    <BaseInput
                        name="password"
                        type="password"
                        placeholder="password"
                        v-model="Data.password"
                        :errors="errors"
                    />
                </div>

                <div class="text-right pt-6">
                    <button
                        type="submit"
                        class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm sm:text-base"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import router from "../../router.js";
import BaseInput from "../UI/Form/BaseInput.vue";
import {useErrorStore} from "../../stores/errorStore.js";
import {useAdminStore} from "../../stores/adminStore.js";

const errorStore = useErrorStore();
const errors = errorStore.errors;

const adminStore = useAdminStore()

const Data = ref({
    email: "",
    password: "",
});

async function login() {
    try {
        await axios.get('/sanctum/csrf-cookie');

        await axios.post("/api/login", Data.value);

        await adminStore.checkUser()

        await router.push({name: "all.members"});
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422) {
                errorStore.showErrors(error.response.data.errors);
            }
            if (error.response.status === 403) {
                errorStore.showErrors({email: [error.response.data.message]});
            }
        }
    }
}
</script>
