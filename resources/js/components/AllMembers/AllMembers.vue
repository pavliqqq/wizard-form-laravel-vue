<template>
    <div class="max-w-7xl mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl text-center font-semibold mb-4">
                All Members
            </h2>

            <div class="overflow-x-auto">
                <BaseTable :headers="tableHeaders">
                    <template v-for="member in members" :key="member.id">
                        <MemberRowEdit
                            v-if="isEdit(member.id)"
                            :memberId="member.id"
                            :memberPhoto="member.photo"
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
                            :isAdmin="adminStore.isAdmin"
                            @edit="changeMember"
                            @delete="deleteMember"
                            @toggle="toggleVisibility"
                        />
                    </template>
                </BaseTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MemberRow from "../UI/Form/MemberRow.vue";
import MemberRowEdit from "../UI/Form/MemberRowEdit.vue";
import BaseTable from "../UI/Form/BaseTable.vue";
import { useErrorStore } from "../../stores/errorStore.js";
import { createFormData } from "../../helpers/request.js";
import { useAdminStore } from "../../stores/adminStore.js";
import axios from "axios";

const members = ref([]);

const editMemberId = ref(null);
const editPhoto = ref(null);
const editPhotoPreview = ref(null);

watch(editPhoto, (file) => {
    if (editPhotoPreview.value) URL.revokeObjectURL(editPhotoPreview.value);
    editPhotoPreview.value = file ? URL.createObjectURL(file) : null;
});

const errorStore = useErrorStore();
const errors = errorStore.errors;

const adminStore = useAdminStore();

const tableHeaders = computed(() => {
    const baseHeaders = ["Photo", "Full Name", "Report Subject", "Email"];

    if (adminStore.isAdmin) {
        return [...baseHeaders, "Edit", "Delete", "Visible"];
    }

    return baseHeaders;
});

function isEdit(id) {
    return editMemberId.value === id;
}

const editForm = ref({
    fullName: "",
    reportSubject: "",
    email: "",
});

const photoService = {
    resetPhoto() {
        editPhoto.value = null;
        editPhotoPreview.value = null;
    },
};

function changeMember(member) {
    editMemberId.value = member.id;
    editForm.value = {
        fullName: member.full_name,
        reportSubject: member.report_subject,
        email: member.email,
    };
    photoService.resetPhoto();

    errorStore.clearErrors();
}

function cancelEditMember() {
    editMemberId.value = null;
    editForm.value = { fullName: "", reportSubject: "", email: "" };
    photoService.resetPhoto();
}

const getMembersService = {
    async getMembers() {
        try {
            let res;
            if (adminStore.isAdmin) {
                res = await axios.get("/api/members");
            } else {
                res = await axios.get("/api/members?filter[visibility]=true");
            }
            members.value = res.data.members;
        } catch (e) {
            console.error("Failed to load members", e);
        }
    },
};

async function updateMember(id) {

    const Data = {
        full_name: editForm.value.fullName,
        reportSubject: editForm.value.reportSubject,
        email: editForm.value.email,
        photo: editPhoto.value,
    };

    const formData = createFormData(Data);
    formData.append("_method", "patch");

    try {
        await axios.post(`api/admin/members/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        editMemberId.value = null;
        photoService.resetPhoto();
        await getMembersService.getMembers();
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errorStore.showErrors(error.response.data.errors);
        }
    }
}

async function toggleVisibility(member) {
    try {
        const res = await axios.post(
            `api/admin/members/toggle/${member.id}`,
            null,
        );
        member.visibility = res.data.visible;
    } catch (error) {
        console.error("Failed to toggle visibility:", error);
    }
}

async function deleteMember(id) {
    try {
        await axios.delete(`api/admin/members/${id}`);
        await getMembersService.getMembers();
    } catch (e) {
        console.error("Failed to delete member", e);
    }
}

onMounted(() => {
    getMembersService.getMembers();
});

defineExpose({ photoService, getMembersService });
</script>
