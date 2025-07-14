<template>
    <VueTelInput
        v-if="ready"
        v-model="phone"
        v-bind="phoneOptions"
        @country-changed="updateCountry"
        @validate="onValidate"
        @blur="onBlur"
    />
    <div
        v-if="(!phoneValid && touched) || error"
        class="error-message text-red-600 text-sm mt-1"
    >
        {{ error || "Invalid phone number." }}
    </div>
</template>

<script setup>
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { computed, ref, watch } from "vue";

const props = defineProps({
    name: String,
    phone: String,
    country: String,
    items: Array,
    phoneValid: Boolean,
    errors: Object,
});

const emit = defineEmits(["update:phone", "update:country"]);

const phone = ref(props.phone);
const country = ref(props.country);
const phoneValid = ref(false);
const touched = ref(false);

watch(phone, (val) => emit("update:phone", val));

function updateCountry(newCountry) {
    if (country.value !== newCountry.iso2) {
        country.value = newCountry.iso2;
        emit("update:country", newCountry.iso2);
    }
}

function onValidate(phoneObject) {
    phoneValid.value = phoneObject.valid;
}

function onBlur() {
    touched.value = true;
}

const phoneOptions = computed(() => ({
    validCharactersOnly: true,
    onlyCountries: props.items,
    mode: "international",
    dropdownOptions: {
        showSearchBox: true,
        searchBoxPlaceholder: "Search...",
        showFlags: true,
        showDialCodeInSelection: true,
    },
    inputOptions: {
        required: true,
        showDialCode: true,
        maxlength: 20,
        name: props.name,
        styleClasses: "border p-2 rounded w-full",
        placeholder: "Phone number",
    },
}));

const ready = computed(
    () => Array.isArray(props.items) && props.items.length > 0,
);

const error = computed(() => props.errors[props.name] ?? null);
</script>
