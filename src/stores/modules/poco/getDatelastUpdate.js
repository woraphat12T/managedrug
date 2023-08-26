import {defineStore} from "pinia";
import axios from "axios";

export const useGetDate = defineStore("getDate", {
    state: () => ({
        getDateLast: [],
    }),
    actions: {
        async getDateData() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
               const response  = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/getDateLast",
                    {},
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                this.getDateLast = response.data
                // console.log("date :", this.getDateLast);
            } catch (error) {
                console.log(error);
            }
        },
    },
});