import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores';
import zortRoutes from './managedrug.router'


const routes = [
  { path: '/', name: 'Login', component: () => import('../authentication/login.vue'), props: true },
  { ...zortRoutes },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        authStore.logout();
        // next({ name: '/login' });
        window.location.href = "http://localhost:5173/";
      },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' } 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/';
    }
});

export default router;
