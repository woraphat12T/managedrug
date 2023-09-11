import { defineStore } from "pinia";
import axios from "axios";
import {ru} from "date-fns/locale";

export const useHisData = defineStore("getHis", {
    state: () => ({
        showGetHisReq: [],
        showGetHisReqDetail: [],
        showGetHisReqDetailHead: [],
        tabName:'req'
    }),
    actions: {
        setTab(tabName) {
            this.tabName = tabName;
            if(tabName === 'req'){
                this.getReq();
            }else{
                this.getRec();
            }


        },
        async getReq() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/requis/getRequis",
                    {
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetHisReq = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async getReqDetail(runno) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/requis/getDetailRequis",
                    {
                        runno:runno
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetHisReqDetail = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async getReqDetailHead(runno) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/requis/getDetailRequisHead",
                    {

                        runno:runno
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetHisReqDetailHead = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },

        //rec
        async getRec() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/Receipt/getReciept",
                    {
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetHisReq = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
    },
});