import { defineStore } from "pinia";
import axios from "axios";

export const usePocoAddItemStore = defineStore("addItem", {
    state: () => ({
        pocoAddItem: [],
    }),
    actions: {
        async addPreItem() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/addItemMaster",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.pocoAddItem = response.data.list;
                // console.log("pocoAddItem", this.pocoAddItem.count);
            } catch (error) {
                console.log(error);
            }
        },
    },
});