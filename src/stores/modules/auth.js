import { defineStore } from "pinia";
import axios, {all} from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    statusToken :[],
  }),
  getters: {

    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/drug/user/login",
          { userName: userLogin, passWord: passwordLogin },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = response.data;
        if (user) {
          this.user = user;
          this.token = user.token
          this.id = user.id
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("idUser", JSON.stringify(user.id));
          localStorage.setItem("fname", JSON.stringify(user.fullname));
          localStorage.setItem("token", JSON.stringify(user.token));
        } else {
          this.logout();
        }
        console.log("login", user);
      } catch (error) {
        console.error(error);
      }
    },
    async Authen() {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
              import.meta.env.VITE_API_URL +
              "/12Trading/checkToken",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
          );
          this.statusToken = response.status
          console.log(response.status)
        }catch (error) {
          // console.log(error.response.status)
        }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.clear()
    },
  },
});
