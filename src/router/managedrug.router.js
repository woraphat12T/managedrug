export default {
    path: '/manageDrug',
    component: () => import('../views/manageDrug/layout.vue'),
    redirect: '/manageDrug/dashboard',
    children: [
        { path: '/manageDrug/dashboard', component: () => import('../views/manageDrug/dashboard.vue') },
        { path: '/manageDrug/addDrug', component: () => import('../views/manageDrug/addDrug.vue') },
    ]
};  