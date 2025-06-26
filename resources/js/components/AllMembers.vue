<template>
    <div class="max-w-7xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-4">All Members</h2>

        <table class="w-full border border-gray-300 rounded overflow-hidden table-fixed">
            <thead class="bg-gray-100">
            <tr>
                <th class="p-3 text-left border-b w-[80px]">Photo</th>
                <th class="p-3 text-left border-b w-[200px] truncate">Full Name</th>
                <th class="p-3 text-left border-b w-[300px] truncate">Report Subject</th>
                <th class="p-3 text-left border-b w-[250px] truncate">Email</th>
                <th class="p-3 text-left border-b w-[80px] truncate">Edit</th>
                <th class="p-3 text-left border-b w-[80px] truncate">Delete</th>
            </tr>
            </thead>
            <tbody id="members-table-body">
            <template v-for="member in members">
                <tr :class="isEdit(member.id) ? 'hidden' : 'border-b'">
                    <th class="hidden">{{ member.id }}</th>
                    <td class="p-3">
                        <img :src="`/storage/${member.photo}`" :alt="member.full_name" class="h-12 w-12 object-cover rounded-full" />
                    </td>
                    <td class="p-3 break-words">{{ member.full_name }}</td>
                    <td class="p-3 break-words">{{ member.report_subject }}</td>
                    <td class="p-3 break-words">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ member.email }}"
                           target="_blank" class="text-blue-600 hover:underline">
                            {{ member.email }}
                        </a>
                    </td>
                    <td><a href="#"
                           @click.prevent="changeMemberId(member.id, member.full_name, member.report_subject, member.email)">Edit</a>
                    </td>
                    <td><a href="#" @click.prevent="deleteMember(member.id)">Delete</a></td>
                </tr>
                <tr :class="isEdit(member.id) ? 'border-b bg-white hover:bg-gray-50' : 'hidden'">
                    <th class="hidden">{{ member.id }}</th>
                    <td class="p-3">
                    </td>
                    <td class="p-3">
                        <input type="text" v-model="full_name"
                               class="w-full border border-gray-300 rounded px-2 py-1 text-sm"/>
                    </td>
                    <td class="p-3">
                        <input type="text" v-model="report_subject"
                               class="w-full border border-gray-300 rounded px-2 py-1 text-sm"/>
                    </td>
                    <td class="p-3">
                        <input type="text" v-model="email"
                               class="w-full border border-gray-300 rounded px-2 py-1 text-sm"/>
                    </td>
                    <td class="p-3">
                        <a href="#"
                           class="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                           @click.prevent="updateMember(member.id)">Update</a>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: "IndexComponent",

    data() {
        return {
            members: null,
            editMemberId: null,
            full_name: null,
            report_subject: null,
            email: null
        }
    },

    mounted() {
        this.getMembers();
    },

    methods: {
        getMembers() {
            axios.get('api/members').then(res => {
                this.members = res.data.members;
            })
        },


        updateMember(id) {
            this.editMemberId = null
            axios.patch(`api/members/${id}`, {
                full_name: this.full_name,
                report_subject: this.report_subject,
                email: this.email
            }).then(res => {
                this.getMembers()
            })
        },

        deleteMember(id) {
            axios.delete(`api/members/${id}`).then(res => {
                this.getMembers()
            })
        },

        changeMemberId(id, full_name, report_subject, email) {
            this.editMemberId = id;
            this.full_name = full_name;
            this.report_subject = report_subject;
            this.email = email;
        },

        isEdit(id) {
            return this.editMemberId === id;
        }
    }
}
</script>
