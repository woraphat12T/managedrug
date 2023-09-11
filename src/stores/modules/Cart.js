import { defineStore } from "pinia";
import axios from "axios";

export const useDataCartStore = defineStore("CartData", {
    state: () => ({
        showGetCart: [],
    }),
    actions: {
        async getCart() {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/getCart",
                    {
                        userId:idUser
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async addCart(id,stock) {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/addCart",
                    {
                        userId:idUser,
                        drugId:id,
                        stock:stock
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
               // this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCart(id) {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/deleteCart",
                    {
                        userId:idUser,
                        drugId:id,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
               // this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async getCartRec() {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/getCartRec",
                    {
                        userId:idUser
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async addCartRec(id,stock) {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/addCartRec",
                    {
                        userId:idUser,
                        drugId:id,
                        stock:stock
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCartRec(id) {
            try {

                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/user/deleteCartRec",
                    {
                        userId:idUser,
                        drugId:id,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // this.showGetCart = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        }
    },
});