<template>
    <div
        v-if="formReady"
        class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded"
    >
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
                    data-testid="firstNameInput"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="last_name"
                    placeholder="Last Name"
                    v-model="Data.lastName"
                    :errors="errors"
                    data-testid="lastNameInput"
                />
            </div>
            <div class="flex flex-col">
                <BirthdateInput 
                    v-model="Data.birthdate" 
                    :errors="errors" 
                    data-testid="birthdateInput"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="report_subject"
                    placeholder="Report Subject"
                    v-model="Data.reportSubject"
                    :errors="errors"
                    data-testid="reportSubjectInput"
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
                    data-testid="phoneInput"
                />
            </div>
            <div class="flex flex-col">
                <BaseInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    v-model="Data.email"
                    :errors="errors"
                    data-testid="emailInput"
                />
            </div>
        </div>

        <div class="text-right pt-6">
            <button
                @click.prevent="action"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200"
                data-testid="nextButton"
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
import { ref, onMounted, computed } from "vue";
import { camelToSnakeObj } from "../../../helpers/caseConverter.js";
import { useErrorStore } from "../../../stores/errorStore.js";
import axios from "axios";

const errorStore = useErrorStore();

const emit = defineEmits(["next"]);
const props = defineProps({
    update: Function,
    errors: Object,
});

const errors = props.errors;

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
const countries = ref([]);

onMounted(() => {
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
        const res = await axios.get("api/countries");

        countries.value = res.data.countries.map((item) => item.code);
    } catch (e) {
        console.error("Failed to load countries", e);
    }
}

const formReady = computed(() => countries.value.length > 0);

function action() {
    originalEmail.value = localStorage.getItem("email");

    if (originalEmail.value === Data.value.email) {
        updateMemberService.updateMember();
    } else createMemberService.createMember();
}

const createMemberService = {
    async createMember() {
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
    },
};

const updateMemberService = {
    async updateMember() {
        memberId.value = localStorage.getItem("id");

        const data = {
            ...Data.value,
            id: memberId.value,
        };
        try {
            const res = await props.update(data);
            if (res) {
                emit("next");
            }
        } catch (e) {
            console.error("Error submitting: ", e);
        }
    },
};

defineExpose({ createMemberService, updateMemberService });
</script>
