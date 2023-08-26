<template>
    <Header></Header>
    <SidebarOnline></SidebarOnline>
    <routerView />
</template>

<script>
import { useAuthStore } from '../../stores';
// import { useRouter } from 'vue-router'
import router from "../../router";
import Header from '../../components/header.vue';
import SidebarOnline from './sidebar.vue';
export default {
  components: {
    Header,
    SidebarOnline,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push('/');
    }

    // const authStore = useAuthStore();
    // const router = useRouter()
    // const login = (username, password) => {
    //   authStore.login(username, password);
    // };
    // const logout = () => {
    //   authStore.logout();
    //   router.push('/');
    // };
    // return {
    //   login,
    //   logout,
    // };
  },
};
</script>
