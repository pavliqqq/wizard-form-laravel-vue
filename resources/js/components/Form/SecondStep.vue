<template>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 class="text-xl text-center font-semibold mb-6" id="form_title">To participate in the conference, please fill
            out the form</h2>

        <div class="space-y-4 mb-4">
            <div class="flex flex-col">
                <input name="company" type="text" placeholder="Company" class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <input name="position" type="text" placeholder="Position" class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <textarea name="about_me" placeholder="About me" class="border p-2 rounded w-full resize-y"></textarea>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>

            <div class="flex flex-col">
                <input name="photo" type="file" class="border p-2 rounded w-full"/>
                <div class="error-message text-red-600 text-sm mt-1"></div>
            </div>
        </div>

        <div class="flex justify-between pt-2">
            <button type="button" onclick="WizardForm.goToStep1()"
                    class="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition-colors duration-200">
                Back
            </button>

            <button type="submit"
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
            company: null,
            position: null,
            about_me: null,
            photo: null,
        }
    },

    methods: {}
}
</script>
