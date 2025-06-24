import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/form/first_step', component: () => import('./components/Form/FirstStep.vue'),
        name: 'first.step'
    },
    {
        path: '/form/second_step', component: () => import('./components/Form/SecondStep.vue'),
        name: 'second.step'
    },
    {
        path: '/all_members', component: () => import('./components/AllMembers.vue'),
        name: 'all.members'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
