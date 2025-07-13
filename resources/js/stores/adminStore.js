import {defineStore} from "pinia";
import {ref} from "vue";

export const useAdminStore = defineStore("admin", () => {
    const isAdmin = ref();

    async function checkUser() {
        try {
            await axios.get('/sanctum/csrf-cookie');

            const res = await axios.get('/api/me')
            isAdmin.value = (res.data.role === 'admin')
            console.log(isAdmin.value)
        } catch (e) {
            console.error("Failed to load user info", e);
        }
    }

    function reset() {
        isAdmin.value = false
    }

    return {isAdmin, checkUser, reset};
}, {
    persist: {
        storage: sessionStorage,
        paths: ['isAdmin'],
    }
});
