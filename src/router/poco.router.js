export default {
    path: '/pocoManage',
    component: () => import('../views/poco/layout.vue'),
    redirect: '/pocoManage/dashboard',
    children: [
        { path: '/pocoManage/dashboard', component: () => import('../views/poco/dashboard.vue') },
        { path: '/pocoManage/addProduct', component: () => import('../views/poco/addItemPO.vue') },
        { path: '/pocoManage/addPO', component: () => import('../views/poco/addPO.vue') },
        { path: '/pocoManage/manageItem', component: () => import('../views/poco/manageItem.vue') },
    ]
};