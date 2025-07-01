<template>
    <div class="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6" id="form_title">To participate in the conference, please fill
            out the form</h2>

        <div class="space-y-4 mb-4">
            <div class="flex flex-col">
                <input
                    name="company"
                    type="text"
                    placeholder="Company"
                    v-model="Data.company"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.company" class="text-red-600 text-sm mt-1">
                    {{ errors.company }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    name="position"
                    type="text"
                    placeholder="Position"
                    v-model="Data.position"
                    class="border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.position" class="text-red-600 text-sm mt-1">
                    {{ errors.position }}
                </div>
            </div>

            <div class="flex flex-col">
                <textarea
                    name="about_me"
                    placeholder="About me"
                    v-model="Data.about_me"
                    class="border p-2 rounded w-full resize-y outline-none focus-within:border-gray-800 focus:border-gray-800">
                </textarea>
                <div v-if="errors.about_me" class="text-red-600 text-sm mt-1">
                    {{ errors.about_me }}
                </div>
            </div>

            <div class="flex flex-col">
                <input
                    name="photo"
                    type="file"
                    accept="image/*"
                    @change="fileChange"
                    class="border p-2 rounded w-full  focus-within:border-gray-800 focus:border-gray-800"
                />
                <div v-if="errors.photo" class="text-red-600 text-sm mt-1">
                    {{ errors.photo }}
                </div>
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


const showErrors = inject('showErrors');
const clearErrors = inject('clearErrors');

const {errors} = defineProps({errors: Object})

const Data = ref({
    id: '',
    company: '',
    position: '',
    about_me: '',
    photo: null,
});


function fileChange(event) {
    const file = event.target.files[0];

    if (!file) return

    const maxSizeKb = 500
    const maxSizeBytes = maxSizeKb * 1024

    if (file.size > maxSizeBytes) {
        showErrors({photo: [`File must be less than ${maxSizeKb}Kb`]})
        return
    }

    clearErrors();
    Data.value.photo = file;
}

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
    Data.value.id = localStorage.getItem('id');
    localStorage.setItem('secondStep', JSON.stringify(Data.value))
    const sendFormData = new FormData();

    sendFormData.append('id', Data.value.id);
    sendFormData.append('company', Data.value.company);
    sendFormData.append('position', Data.value.position);
    sendFormData.append('about_me', Data.value.about_me);

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
