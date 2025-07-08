<template>
    <BaseTable :headers="tableHeaders">
        <template v-for="member in members" :key="member.id">
            <MemberRowEdit
                v-if="isEdit(member.id)"
                :member="member"
                :photoPreview="editPhotoPreview"
                v-model:photo="editPhoto"
                v-model:fullName="editForm.fullName"
                v-model:reportSubject="editForm.reportSubject"
                v-model:email="editForm.email"
                @update="updateMember"
                @cancelEdit="cancelEditMember"
                :errors="errors"
            />
            <MemberRow
                v-else
                :member="member"
                :isAdmin="isAdmin"
                @edit="changeMember"
                @delete="deleteMember"
                @toggle="toggleVisibility"
            />
        </template>
    </BaseTable>
</template>

<script setup>

import {inject, onMounted, ref, watch} from "vue";
import {toSnakeCase} from "../../utils/caseConverter.js";
import MemberRow from "../MemberRow.vue";
import MemberRowEdit from "../MemberRowEdit.vue";
import BaseTable from "../BaseTable.vue";

const members = ref([])

const editMemberId = ref(null)
const editPhoto = ref(null)
const editPhotoPreview = ref(null)

watch(editPhoto, (file) => {
    if (editPhotoPreview.value) {
        URL.revokeObjectURL(editPhotoPreview.value)
    }

    editPhotoPreview.value = file ? URL.createObjectURL(file) : null
})

const showErrors = inject('showErrors')
const clearErrors = inject('clearErrors')

const props = defineProps({
    errors: Object,
    isAdmin: Boolean
});

const tableHeaders = [
    "Photo",
    "Full Name",
    "Report Subject",
    "Email",
    props.isAdmin ? ["Edit", "Delete", "Visible"] : []
];

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

function cancelEditMember() {
    editMemberId.value = null
    editForm.value = {fullName: '', reportSubject: '', email: ''}
    editPhoto.value = null
    editPhotoPreview.value = null
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
