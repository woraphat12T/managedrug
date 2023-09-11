import { defineStore } from "pinia";
import axios from "axios";

export const useManageDrug = defineStore("ManageDrug", {
    state: () => ({

    }),
    actions: {
        async updateStatus(id,status) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/updateDrug",
                    {
                        durgid:id,
                        status:`${status}`
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
    },
});