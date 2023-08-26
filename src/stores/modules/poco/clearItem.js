import {defineStore} from "pinia";
import axios from "axios";

export const useClearPreItem = defineStore("ClearPreItem", {
    state: () => ({
        ClearPreItem: [],
    }),
    actions: {
        async ClearItem() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
               const response  = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/deletePreItem",
                    {},
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                this.ClearPreItem = response
                 console.log("date :", this.ClearPreItem);
            } catch (error) {
                console.log(error);
            }
        },
    },
});