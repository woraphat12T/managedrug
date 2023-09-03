import { defineStore } from "pinia";
import axios from "axios";

export const useGetDrug = defineStore("GetDrug", {
    state: () => ({
        showGetDrug: [],
        showSelectDrug: []
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
        async getDrugToSelect() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrugSelect",
                    {
                        userId:idUser
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showSelectDrug = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
    },
});