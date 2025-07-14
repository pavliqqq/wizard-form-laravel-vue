<template>
    <div v-if="formReady" class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6">
            To participate in the conference, please fill out the form
        </h2>

        <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <BaseInput
                    name="first_name"
                    placeholder="First Name"
                    v-model="Data.firstName"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="last_name"
                    placeholder="Last Name"
                    v-model="Data.lastName"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BirthdateInput v-model="Data.birthdate" :errors="errors"/>
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="report_subject"
                    placeholder="Report Subject"
                    v-model="Data.reportSubject"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <PhoneInput
                    name="phone"
                    v-model:phone="Data.phone"
                    v-model:country="Data.country"
                    :items="countries"
                    :key="renderKey"
                    :errors="errors"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="email"
                    placeholder="Email"
                    v-model="Data.email"
                    :errors="errors"
                />
            </div>
        </div>

        <div class="text-right pt-6">
            <button
                @click.prevent="action"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import PhoneInput from "../../UI/Form/CountryPhoneInput.vue";
import BaseInput from "../../UI/Form/BaseInput.vue";
import BirthdateInput from "../../UI/Form/BirthdateInput.vue";
import {ref, onMounted, computed} from "vue";
import {camelToSnakeObj} from "../../../helpers/caseConverter.js";
import {useErrorStore} from "../../../stores/errorStore.js";
import {createFormData} from "../../../helpers/request.js";

const errorStore = useErrorStore();
const errors = errorStore.errors;

const emit = defineEmits(["next"]);

const Data = ref({
    firstName: "",
    lastName: "",
    birthdate: "",
    reportSubject: "",
    country: "",
    phone: "",
    email: "",
});

const renderKey = ref(0);
const memberId = ref(null);
const originalEmail = ref(null);
const countries = ref([])

onMounted(() => {
    errorStore.clearErrors();

    const saved = localStorage.getItem("firstStep");
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(Data.value, parsed);
    }

    getCountries();

    renderKey.value++;
});

async function getCountries() {
    try {
        const res = await axios.get('api/countries');

        countries.value = res.data.map(item => item.code);

    } catch (e) {
        console.error("Failed to load countries", e);
    }
}

const formReady = computed(() => countries.value.length > 0);

function action() {
    originalEmail.value = localStorage.getItem("email");

    if (originalEmail.value === Data.value.email) {
        updateMember();
    } else createMember();
}

async function createMember() {
    localStorage.setItem("firstStep", JSON.stringify(Data.value));

    const value = camelToSnakeObj(Data.value);
    try {
        const res = await axios.post("/api/members", value);

        localStorage.setItem("id", res.data.id);
        localStorage.setItem("email", res.data.email);
        emit("next");
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errorStore.showErrors(error.response.data.errors);
        }
    }
}

async function updateMember() {
    memberId.value = localStorage.getItem("id");

    const formData = createFormData(Data.value);
    formData.append("_method", "patch");

    try {
        await axios.post(`/api/members/${memberId.value}`, formData);
        emit("next");
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errorStore.showErrors(error.response.data.errors);
        }
    }
}
</script>
