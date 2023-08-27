import { defineStore } from "pinia";
import axios from "axios";

export const useGetDrug = defineStore("GetDrug", {
    state: () => ({
        showGetDrug: [],
    }),
    actions: {
        async getDrugToAddDrug() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrug",
                    {
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetDrug = response.data;
                 // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
    },
});