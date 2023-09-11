import { defineStore } from "pinia";
import axios from "axios";

export const useRecieptData = defineStore("getReciept", {
    state: () => ({
        showGetReciept: [],
    }),
    actions: {
        async addReciept(inputValue) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const fname = JSON.parse(localStorage.getItem("fname"));
                //  const PayUsers = JSON.parse(localStorage.getItem("fname"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/Receipt/addReciept",
                    {
                        userId:idUser,
                        userRec: fname,
                        dateReq:inputValue
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // this.showGetDrug = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        }
    },
});