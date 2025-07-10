import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("admin", () => {
    const isAdmin = ref(false);

    return { isAdmin };
});
