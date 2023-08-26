import { defineStore } from "pinia";
import axios from "axios";

export const usePocoGetItemMasterStore = defineStore("getItemMaster", {
    state: () => ({
        pocoGetItemMaster: [],
        tabName:'all'
    }),
    actions: {
        setTab(tabName) {
          this.tabName = tabName;
          this.getItemMaster();
        },
      async getItemMaster() {
        try {
            const tabName = this.tabName
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
            import.meta.env.VITE_API_URL +
              "/PurchaseCustomerOrder/item/ItemManage/getItem",
            {
                tab:tabName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.pocoGetItemMaster = response.data.list;
          // console.log("pocoGETItem", this.pocoGetItem);
        } catch (error) {
          console.log(error);
        }
      },
    },
  });