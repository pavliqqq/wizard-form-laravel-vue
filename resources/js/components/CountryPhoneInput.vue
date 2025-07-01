<template>
    <div class="flex flex-col">
        <VueTelInput
            v-model="phone"
            v-bind="phoneOptions"
            @country-changed="updateCountry"
            @validate="onValidate"
            @blur="onBlur"
        />
        <div v-if="(!phoneValid && touched) || errors.phone " class="error-message text-red-600 text-sm mt-1">
            {{ errors.phone || errors.phone_valid || 'Invalid phone number.' }}
        </div>
    </div>
</template>


<script setup>
import {VueTelInput} from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { ref, watch} from "vue";

const props = defineProps({
    phone: String,
    country: String,
    phoneValid: Boolean,
    errors: Object,
});

const emit = defineEmits(['update:phone', 'update:country', 'update:phoneValid'])

const phone = ref(props.phone)
const country = ref(props.country)
const phoneValid = ref(false)
const touched = ref(false)

watch(phone, val => emit('update:phone', val));

function updateCountry(newCountry) {
    if (country.value !== newCountry.iso2) {
        country.value = newCountry.iso2
        emit('update:country', newCountry.iso2)
    }
}

function onValidate(phoneObject) {
    phoneValid.value = phoneObject.valid
    emit('update:phoneValid', phoneObject.valid)
}

function onBlur() {
    touched.value = true;
}

const phoneOptions = {
    validCharactersOnly: true,
    mode: 'international',
    dropdownOptions: {
        showSearchBox: true,
        searchBoxPlaceholder: 'United States',
        showFlags: true,
        showDialCodeInSelection: true
    },

    inputOptions: {
        required: true,
        showDialCode: true,
        maxlength: 20,
        name: 'phone',
        styleClasses: 'border p-2 rounded w-full',
        placeholder: 'Phone number',
    },
}
</script>


<style scoped>

</style>
