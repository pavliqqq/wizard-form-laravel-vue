import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/form",
    },
    {
        path: "/form",
        component: () => import("./components/Form/MemberForm.vue"),
        name: "member.form",
    },
    {
        path: "/all_members",
        component: () => import("./components/AllMembers/AllMembers.vue"),
        name: "all.members",
    },
    {
        path: "/admin/login",
        component: () => import("./components/Admin/AdminLogin.vue"),
        name: "admin.login",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
