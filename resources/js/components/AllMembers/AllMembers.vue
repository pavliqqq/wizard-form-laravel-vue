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
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MemberRow from "../MemberRow.vue";
import MemberRowEdit from "../MemberRowEdit.vue";
import BaseTable from "../UI/Form/BaseTable.vue";
import { useErrorStore } from "../../stores/errorStore.js";
import { createFormData } from "../../helpers/request.js";
import { useAdminStore } from "../../stores/adminStore.js";
import { splitter } from "../../helpers/fullNameSplitter.js";

const members = ref([]);

const editMemberId = ref(null);
const editPhoto = ref(null);
const editPhotoPreview = ref(null);

watch(editPhoto, (file) => {
    if (editPhotoPreview.value) {
        URL.revokeObjectURL(editPhotoPreview.value);
    }

    editPhotoPreview.value = file ? URL.createObjectURL(file) : null;
});

const errorStore = useErrorStore();
const errors = errorStore.errors;

const adminStore = useAdminStore();
const isAdmin = adminStore.isAdmin;

const tableHeaders = computed(() => {
    const baseHeaders = ["Photo", "Full Name", "Report Subject", "Email"];

    if (isAdmin) {
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

function changeMember(member) {
    editMemberId.value = member.id;
    editForm.value = {
        fullName: member.full_name,
        reportSubject: member.report_subject,
        email: member.email,
    };
    editPhoto.value = null;
    editPhotoPreview.value = null;

    errorStore.clearErrors();
}

function cancelEditMember() {
    editMemberId.value = null;
    editForm.value = { fullName: "", reportSubject: "", email: "" };
    editPhoto.value = null;
    editPhotoPreview.value = null;
}

const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

async function getMembers() {
    try {
        let res;
        if (isAdmin) {
            res = await axios.get("/api/members", {
                headers: authHeader,
            });
        } else {
            res = await axios.get("/api/members?filter[visibility]=true");
        }
        members.value = res.data.members;
    } catch (e) {
        console.error("Failed to load members", e);
    }
}

const { firstName, lastName } = splitter(editForm.value.fullName);

async function updateMember(id) {
    const Data = {
        firstName: firstName,
        lastName: lastName,
        reportSubject: editForm.value.reportSubject,
        email: editForm.value.email,
        photo: editPhoto.value,
    };

    const formData = createFormData(Data);

    try {
        await axios.post(`api/members/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                authHeader,
            },
        });
        editMemberId.value = null;
        editPhoto.value = null;
        editPhotoPreview.value = null;
        await getMembers();
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
            {
                headers: authHeader,
            },
        );
        member.visibility = res.data.visible;
    } catch (error) {
        console.error("Failed to toggle visibility:", error);
    }
}

async function deleteMember(id) {
    try {
        await axios.delete(`api/admin/members/${id}`, {
            headers: authHeader,
        });
        await getMembers();
    } catch (e) {
        console.error("Failed to delete member", e);
    }
}

onMounted(() => {
    getMembers();
});
</script>
