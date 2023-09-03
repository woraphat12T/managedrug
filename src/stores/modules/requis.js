import { defineStore } from "pinia";
import axios from "axios";

export const useRequisData = defineStore("getRequis", {
    state: () => ({
        showGetRequis: [],
    }),
    actions: {
        async addRequis(PayUsers,inputValue) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const fname = JSON.parse(localStorage.getItem("fname"));
              //  const PayUsers = JSON.parse(localStorage.getItem("fname"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/requis/addRequis",
                    {
                        userId:idUser,
                        userReq: fname,
                        userPay:PayUsers,
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