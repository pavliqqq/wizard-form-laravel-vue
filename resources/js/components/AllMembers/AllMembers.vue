<template>
    <div class="max-w-7xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-4">All Members</h2>

        <table class="w-full border border-gray-300 rounded overflow-hidden table-fixed">
            <thead class="bg-gray-100">
            <tr>
                <th class="p-3 text-left border-b w-[80px]">Photo</th>
                <th class="p-3 text-left border-b w-[200px] truncate">Full Name</th>
                <th class="p-3 text-left border-b w-[300px] truncate">Report Subject</th>
                <th class="p-3 text-left border-b w-[250px] truncate">Email</th>
                <th v-if="isAdmin" class="p-3 text-left border-b w-[80px] truncate">Edit</th>
                <th v-if="isAdmin" class="p-3 text-left border-b w-[80px] truncate">Delete</th>
                <th v-if="isAdmin" class="p-3 text-left border-b w-[80px] truncate">Visible</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="member in members" :key="member.id">
                <tr :class="isEdit(member.id) ? 'hidden' : 'border-b'">
                    <th class="hidden">{{ member.id }}</th>
                    <td class="p-3">
                        <img
                            :src="`/storage/${member.photo}`"
                            :alt="member.full_name"
                            class="h-12 w-12 object-cover rounded-full"
                        />
                    </td>
                    <td class="p-3 break-words">{{ member.full_name }}</td>
                    <td class="p-3 break-words">{{ member.report_subject }}</td>
                    <td class="p-3 break-words">
                        <a :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`"
                           target="_blank"
                           class="text-blue-600 hover:underline"
                        >
                            {{ member.email }}
                        </a>
                    </td>
                    <td v-if="isAdmin" class="p-3">
                        <button
                            @click.prevent="changeMember(member)"
                            class="underline text-orange-600"
                        >
                            Edit
                        </button>
                    </td>
                    <td v-if="isAdmin" class="p-3">
                        <button
                            @click.prevent="deleteMember(member.id)"
                            class="underline text-red-600"
                        >
                            Delete
                        </button>
                    </td>
                    <td v-if="isAdmin" class="p-3">
                        <button
                            @click.prevent="toggleVisibility(member)"
                            :class="member.visibility ? 'text-green-600' : 'text-gray-400'"
                            class="underline"
                        >
                            {{ member.visibility ? 'Visible' : 'Hidden' }}
                        </button>
                    </td>
                </tr>

                <tr :class="isEdit(member.id) ? 'border-b bg-white hover:bg-gray-50' : 'hidden'">
                    <th class="hidden">{{ member.id }}</th>
                    <td class="p-3">
                        <label class="block w-12 h-12 relative">
                            <img
                                :src="editPhotoPreview || `/storage/${member.photo}`"
                                alt="photo"
                                class="w-12 h-12 object-cover rounded-full"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                class="absolute inset-0 opacity-0"
                                @change="fileChange"
                            />
                        </label>
                        <div class="text-red-600 text-sm mt-1 min-h-[1.25rem]">
                            {{ errors.photo || ' ' }}
                        </div>
                    </td>
                    <td class="p-3">
                        <input
                            type="text"
                            v-model="editForm.fullName"
                            class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <div class="text-red-600 text-sm mt-1 min-h-[1.25rem]">
                            {{ errors.full_name || ' ' }}
                        </div>
                    </td>
                    <td class="p-3">
                        <input type="text"
                               v-model="editForm.reportSubject"
                               class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <div class="text-red-600 text-sm mt-1 min-h-[1.25rem]">
                            {{ errors.report_subject || ' ' }}
                        </div>
                    </td>
                    <td class="p-3">
                        <input
                            type="text"
                            v-model="editForm.email"
                            class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <div class="text-red-600 text-sm mt-1 min-h-[1.25rem]">
                            {{ errors.email || ' ' }}
                        </div>
                    </td>
                    <td class="p-3">
                        <a
                            href="#"
                            class="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                            @click.prevent="updateMember(member.id)">
                            Update
                        </a>
                    </td>
                    <td class="p-3">
                        <a
                            href="#"
                            @click.prevent="editMemberId = null"
                            class="ml-2 text-sm text-gray-500 hover:underline">
                            Cancel
                        </a>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>

import {inject, onMounted, ref} from "vue";
import {toSnakeCase} from "../../utils/caseConverter.js";

const members = ref([])

const editMemberId = ref(null)
const editPhoto = ref(null)
const editPhotoPreview = ref(null)

const showErrors = inject('showErrors')
const clearErrors = inject('clearErrors')

const props = defineProps({
    errors: Object,
    isAdmin: Boolean
});

const editForm = ref({
    fullName: '',
    reportSubject: '',
    email: ''
})


function isEdit(id) {
    return editMemberId.value === id;
}

function changeMember(member) {
    editMemberId.value = member.id
    editForm.value = {
        fullName: member.full_name,
        reportSubject: member.report_subject,
        email: member.email
    }
    editPhoto.value = null;
    editPhotoPreview.value = null;

    clearErrors();
}

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
    editPhoto.value = file;
    editPhotoPreview.value = URL.createObjectURL(file);
}

async function getMembers() {
    try {
        let res;
        if (props.isAdmin) {
            res = await axios.get('/api/members/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
        } else {
            res = await axios.get('/api/members/all');
        }
        members.value = res.data.members;
    } catch (e) {
        console.error('Failed to load members', e);
    }
}

async function updateMember(id) {
    const plainData = {
        fullName: editForm.value.fullName,
        reportSubject: editForm.value.reportSubject,
        email: editForm.value.email,
    };

    const snakeCaseData = toSnakeCase(plainData);

    const sendFormData = new FormData();
    for (const [key, value] of Object.entries(snakeCaseData)) {
        sendFormData.append(key, value);
    }

    if (editPhoto.value) {
        sendFormData.append('photo', editPhoto.value);
    }

    try {
        await axios.post(`api/admin/members/${id}`, sendFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        editMemberId.value = null
        editPhoto.value = null;
        editPhotoPreview.value = null;
        await getMembers()
    } catch (error) {
        if (error.response && error.response.status === 422) {
            showErrors(error.response.data.errors);
        }
    }
}

async function toggleVisibility(member) {
    try {
        const res = await axios.post(`api/admin/members/toggle/${member.id}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        member.visibility = res.data.visible;
    } catch (error) {
        console.error('Failed to toggle visibility:', error);
    }
}

async function deleteMember(id) {
    try {
        await axios.delete(`api/admin/members/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        await getMembers()
    } catch (e) {
        console.error('Failed to delete member', e)
    }
}

onMounted(() => {
    getMembers()
})
</script>
