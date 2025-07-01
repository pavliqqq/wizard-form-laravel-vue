import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/form/first_step'
    },
    {
        path: '/form/first_step', component: () => import('./components/Form/FirstStep.vue'),
        name: 'first.step'
    },
    {
        path: '/form/second_step', component: () => import('./components/Form/SecondStep.vue'),
        name: 'second.step'
    },
    {
        path: '/form/third_step', component: () => import('./components/Form/ThirdStep.vue'),
        name: 'third.step'
    },
    {
        path: '/all_members', component: () => import('./components/AllMembers/AllMembers.vue'),
        name: 'all.members'
    },
    {
        path: '/admin/login', component: () => import('./components/Admin/AdminLogin.vue'),
        name: 'admin.login'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
