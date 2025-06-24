<template>

    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6" id="form_title">To participate in the conference, please fill
            out the form</h2>

        <div class="flex flex-col">
            <input name="first_name" type="text" placeholder="First Name" v-model="first_name"
                   class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <input name="last_name" type="text" placeholder="Last Name" v-model="last_name"
                   class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <input name="birthdate" type="date" v-model="birthdate" class="border p-2 rounded w-full" id="birthdate"
                   max=""/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <input name="report_subject" type="text" placeholder="Report Subject" v-model="report_subject"
                   class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <!--            <select id="countrySelect" name="country" class="border p-2 rounded w-full">-->
            <!--                <option value="" disabled selected>Select country</option>-->
            <!--            </select>-->
            <input name="country" type="text" placeholder="Country(2)" v-model="country"
                   class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <input id="phone" name="phone" type="tel" v-model="phone" class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="flex flex-col">
            <input name="email" type="text" placeholder="Email" v-model="email" class="border p-2 rounded w-full"/>
            <div class="error-message text-red-600 text-sm mt-1"></div>
        </div>

        <div class="text-right pt-2">
            <button @click.prevent="addMember"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200">
                Next
            </button>
        </div>
    </div>
</template>

<script>
import router from '../../router.js'
export default {
    name: "FirstStep",

    data() {
        return {
            first_name: null,
            last_name: null,
            birthdate: null,
            report_subject: null,
            country: null,
            phone: null,
            email: null
        }
    },

    methods: {
        addMember() {
            axios.post('/api/members', {
                first_name: this.first_name,
                last_name: this.last_name,
                birthdate: this.birthdate,
                report_subject: this.report_subject,
                country: this.country,
                phone: this.phone,
                email: this.email
            })
                .then(res => {
                    router.push({ name: 'second.step' })
                })
        }
    }
}
</script>
