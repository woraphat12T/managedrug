export default {
    path: '/manageDrug',
    component: () => import('../views/manageDrug/layout.vue'),
    redirect: '/manageDrug/dashboard',
    children: [
        { path: '/manageDrug/dashboard', component: () => import('../../src/views/manageDrug/Dashboard.vue') },
        { path: '/manageDrug/addDrug', component: () => import('../views/manageDrug/addDrug.vue') },
        { path: '/manageDrug/manageDrug', component: () => import('../views/manageDrug/managedrug.vue') },
        { path: '/manageDrug/pickupDrug', component: () => import('../views/manageDrug/pickupDrug.vue') },
        { path: '/manageDrug/hisReq', component: () => import('../views/manageDrug/hisReq.vue') },
        { path: '/manageDrug/recieptDrug', component: () => import('../views/manageDrug/recieptDrug.vue') },
        { path: '/manageDrug/exportdrughistory', component: () => import('../views/manageDrug/exportdrughistory.vue') },
    ]
};  