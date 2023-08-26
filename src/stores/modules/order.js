import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    zortOrder: [],
    tabName: "wait-tab",
  }),
  getter: {
    getZortOrder: (state) => state.zortOrder,
    gettabName: (state) => state.tabName,
  },
  actions: {
    setTab(tabName) {
      this.tabName = tabName; // กำหนดค่า tabName ให้เป็นค่าที่เลือกใหม่
      this.getOrderZort(); // เรียก getOrderZort เพื่อดึงข้อมูลใหม่สำหรับ tab ใหม่ที่เลือก
    },
    async getOrderZort() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const pageName = localStorage.getItem("orderPage");
        const tabName = this.tabName;
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrder",
          {
            page: pageName,
            tab: tabName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortOrder = result;
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log("orderzort", this.zortOrder);
        console.log("orderpage", pageName);
        console.log("orderpage", tabName);
      } catch (error) {
        console.error(error);
      }
    },
    async addOrderErp() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/M3API/OrderManage/order/addOrderM3",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortOrder = result;
        console.log("orderm3", this.zortOrder);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
