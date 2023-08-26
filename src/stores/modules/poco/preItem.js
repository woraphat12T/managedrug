import { defineStore } from "pinia";
import axios from "axios";

export const usePocoGetItemStore = defineStore("getItem", {
    state: () => ({
        pocoGetItem: [],
        tabName:'all'
    }),
    actions: {
        setTab(tabName) {
          this.tabName = tabName;
          this.getPreItem();
        },
      async getPreItem() {
        try {
            const tabName = this.tabName
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
            import.meta.env.VITE_API_URL +
              "/PurchaseCustomerOrder/item/ItemManage/getPreItem",
            {
                tab:tabName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.pocoGetItem = response.data.list;
          // console.log("pocoGETItem", this.pocoGetItem);
        } catch (error) {
          console.log(error);
        }
      },
    },
  });