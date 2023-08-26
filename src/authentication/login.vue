<template>
  <section class="bg-gray-100 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-center">
          <div class="flex items-center">
            <img class="w-60 h-21 mr-2" src="/logo-onetwo.png" alt="logo" />
          </div>
        </div>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-6" style="padding-top: 0%">
          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="SignIn"
            method="post"
          >
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                type="text"
                v-model="userLogin"
                id="userLogin"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user.sur"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                v-model="passwordLogin"
                id="passwordLogin"
                :class="{ 'invalid-input': isPasswordInvalid }"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div class="flex items-center justify-end">
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</a
              >
            </div>
            <button
              style="border-radius: 100px; background-color: steelblue"
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref,onMounted } from 'vue';
import { useAuthStore } from '../stores';
import router from '../router';

export default {
  props: {
    id: String,
    required: true,
  },
  setup(props) {
    const userLogin = ref('');
    const passwordLogin = ref('');
    const isPasswordInvalid = ref(false);

    const SignIn = async () => {
      const authStore = useAuthStore();
      await authStore.login(userLogin.value, passwordLogin.value);
      // this.$router.push('/');
      router.push(`/${props.id}`);
    };
    onMounted(() => {
      console.log(props.id);
    });
    return {
      userLogin,
      passwordLogin,
      isPasswordInvalid,
      SignIn,
    };
  },
};
</script>

<style scoped>
.invalid-input {
  border: 1px solid red;
  box-shadow: 0 0 2px red;
}
</style>
