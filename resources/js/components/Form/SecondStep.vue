<template>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6" id="form_title">To participate in the conference, please fill
            out the form</h2>

        <div class="space-y-4 mb-4">
            <div class="flex flex-col">
                <input name="company" type="text" placeholder="Company" v-model="company"
                       class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <input name="position" type="text" placeholder="Position" v-model="position"
                       class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <textarea name="about_me" placeholder="About me" v-model="about_me"
                          class="border p-2 rounded w-full resize-y"></textarea>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <input name="photo" type="file" class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>
        </div>

        <div class="flex justify-between pt-2">
            <button type="button" @click="goToFirstStep()"
                    class="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition-colors duration-200">
                Back
            </button>

            <button @click.prevent="secondStepSubmit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200">
                Next
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: "SecondStep",

    data() {
        return {
            id: null,
            company: null,
            position: null,
            about_me: null,
            photo: null,
        }
    },

    inject: ['showErrors'],

    methods: {

        goToFirstStep() {
            this.$router.push({name: 'first.step'});
        },

        async secondStepSubmit() {
            this.id = localStorage.getItem('id');
            try {
                const res = await axios.patch(`/api/members/${this.id}`, {
                    id: this.id,
                    company: this.company,
                    position: this.position,
                    about_me: this.about_me,
                    photo: this.photo,
                });

                localStorage.setItem('count', res.data.count);
                this.$router.push({name: "all.members"});
            } catch (error) {
                if (error.response.status === 422) {
                    this.showErrors(error.response.data.errors);
                }
            }
        },
    }
}
</script>
