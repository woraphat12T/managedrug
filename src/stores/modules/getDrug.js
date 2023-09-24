import { defineStore } from "pinia";
import axios from "axios";

export const useGetDrug = defineStore("GetDrug", {
    state: () => ({
        showGetDrug: [],
        showGetDrugHis: [],
        showSelectDrug: [],
        showDrugEdit:[]
    }),
    actions: {
        async getDrugToAddDrug() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrugAdd",
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
        async getDrugToShowDrug() {
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
        async getDrugToSelectRec() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const idUser = JSON.parse(localStorage.getItem("idUser"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrugSelectRec",
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
        async getDrugHis(startDate,stopDate) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrugHis",
                    {
                        DateStart:startDate,
                        DateEnd:stopDate
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showGetDrugHis = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async getDrugToEdit(idDrug) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/getDrugToEdit",
                    {
                        drugId:idDrug
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.showDrugEdit = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
        async updateDrugEdit(idDrug,nameDrug,dose,doseType,qty,qtyType,pricePerQty,stock) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL +
                    "/drug/drug/updateDrugData",
                    {
                        id:idDrug,
                        nameDrug:nameDrug,
                        dose:dose,
                        doseType:doseType,
                        qty:qty,
                        qtyType:qtyType,
                        pricePerQty:pricePerQty,
                        stock:stock
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log('edit :::::: '+response.data)
                // this.showDrugEdit = response.data;
                // console.log("showGetDrug", this.showGetDrug);
            } catch (error) {
                console.log(error);
            }
        },
    },
});