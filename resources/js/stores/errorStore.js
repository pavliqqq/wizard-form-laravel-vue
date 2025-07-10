import { defineStore } from "pinia";
import { reactive } from "vue";

export const useErrorStore = defineStore("error", () => {
    const errors = reactive({});

    function clearErrors() {
        Object.keys(errors).forEach((key) => {
            delete errors[key];
        });
    }

    function showErrors(newErrors) {
        clearErrors();
        for (const [key, message] of Object.entries(newErrors)) {
            errors[key] = message[0];
        }
    }

    return { errors, clearErrors, showErrors };
});
