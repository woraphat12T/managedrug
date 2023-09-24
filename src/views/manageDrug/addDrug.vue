<template>
  <div class="p-4 sm:ml-32">
    <div class="p-4 mt-14">
      <div class="flex flex-row">
        <form class="w-1/2 mr-2" method="post"
              @submit.prevent="AddDrug">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     for="first_name">ชื่อยา</label>
              <input id="nameDrug"
                     v-model="inputNameDrug"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="กรุณากรอกชื่อยา"
                     required type="text">
            </div>
            <div>
              <div class="flex items-center">
                <div class="w-1/2 pr-2">
                  <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white" for="last_name">ขนาดโดส</label>
                  <input id="sizeDose"
                         v-model="sizeDose"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="เช่น 300"
                         required type="text">
                </div>
                <div class="w-1/2 pl-2">
                  <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white" for="last_name">หน่วยโดส</label>
                  <div class="card flex justify-content-center items-center">
                    <select id="doseType"
                            v-model="doseType"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
       block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
         dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="checkDoseType"
                    >
                      <option selected value="">เลือกหน่วยโดส</option>
                      <option value="G12">G12 : ผงรสมะนาว</option>
                      <option value="G13">G13 : น้ำจิ้มไก่</option>
                      <option value="G03">G03 : น้ำจิ้มไก่</option>
                      <option value="G02">G02 : ผงทำซุปน้ำใส</option>
                      <option value="G11">G11 : ผงปรุงรส</option>
                      <option value="G04">G04 : ผงปรุงรส</option>
                      <option value="G05">G05 : ผงต้มยำ</option>
                      <option value="G17">G17 : ผงต้มยำ</option>
                      <option value="G06">G06 : ผงปรุงรสหมู</option>
                      <option value="etc">กรอกหน่วยอื่นๆ</option>
                    </select>
                  </div>
                  <input
                      v-if="showCustomDoseType"
                      v-model="customDoseType"
                      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="กรอกหน่วยอื่นๆ..."
                      type="text"
                  >
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-center">
                <div class="w-1/2 pr-2">
                  <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white" for="last_name">จำนวน/qty</label>
                  <input id="qty"
                         v-model="qty"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="เช่น 300"
                         required type="text">
                </div>
                <div class="w-1/2 pl-2">
                  <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white" for="last_name">หน่วย</label>
                  <div class="card flex justify-content-center items-center">
                    <select
                        id="qtyType"
                        v-model="qtyType"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @change="checkQtyType"
                    >
                      <option selected value="">เลือกหน่วย</option>
                      <option value="G12">G12 : ผงรสมะนาว</option>
                      <option value="G06">G06 : ผงปรุงรสหมู</option>
                      <option value="etc">กรอกหน่วยอื่นๆ</option>
                    </select>

                  </div>
                  <input
                      v-if="showCustomQtyType"
                      v-model="customQtyType"
                      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="กรอกหน่วยอื่นๆ..."
                      type="text"
                  >
                </div>
              </div>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     for="visitors">ราคา/หน่วย</label>
              <input id="pricePerQty"
                     v-model="pricePerQty"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder=""
                     required type="text">
            </div>
          </div>
          <div class="">
            <div class="">
              <button
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit">
                เพิ่มยา
              </button>
            </div>

          </div>
        </form>
        <div class="w-1/2">
          <div class="flex justify-center ">
            <span class="font-medium text-sm mb-2">ยาที่มีในคลัง</span>
          </div>
          <div class="ml-8 overflow-y-scroll h-[550px]">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <TableItem :columns=tableColumns :data=filteredItems>
                <template v-slot:nameDrug="{ row }">
                <div class="text-left">
                  {{ row.nameDrug }}
                </div>
                </template>
              </TableItem>
            </table>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>
<script>
import {Icon} from '@iconify/vue';
import {computed, onMounted, ref} from "vue";
import TableItem from '../../components/table.vue'
import SelectOption from "../../components/selectoption.vue";
import axios from 'axios';
import {useGetDrug} from "@/stores/index.js";
import Swal from "sweetalert2";


export default {
  components: {
    Icon,
    SelectOption,
    TableItem

  },
  setup() {

    const tableColumns = computed(() => {
      return [
        {id: 'nameDrug', title: 'ชื่อยา'},
        {id: 'doseType', title: 'หน่วย'},
        {id: 'pricePerQty', title: 'ราคาต่อหน่วย'},
        {id: 'stock', title: 'คงเหลือ'},
      ];
    });

    const getDurg = useGetDrug();

    const Drug = computed(() => {
      return getDurg.showGetDrug;
    });

    // search bar start

    const filteredItems = computed(() => {
      if (!inputNameDrug.value) {
        return Drug.value;
      }
      const keyword = inputNameDrug.value;
      return Drug.value.filter(
          (item) =>
              item.nameDrug.toLowerCase().includes(keyword)
      );
    });

    const handleInput = (searchText) => {
      inputNameDrug.value = searchText.data;
      console.log(searchText)
    };


    onMounted(() => {
      getDurg.getDrugToAddDrug();
    });


    const inputNameDrug = ref('');
    const sizeDose = ref('');
    const qty = ref('');
    const pricePerQty = ref('');
    const qtyType = ref('');
    const doseType = ref('');
    const showCustomQtyType = ref(false)
    const showCustomDoseType = ref(false)
    const customQtyType = ref('')
    const customDoseType = ref('')
    const QQtyp = ref('')
    const DDoseType = ref('')
    const checkQtyType = async () => {
      console.log(qtyType.value)
      if (qtyType.value === 'etc') {
        showCustomQtyType.value = true
      } else {
        showCustomQtyType.value = false
      }
    };
    const checkDoseType = async () => {
      console.log(doseType.value)
      if (doseType.value === 'etc') {
        showCustomDoseType.value = true
      } else {
        showCustomDoseType.value = false
      }
    };

    const AddDrug = async () => {
      // console.log(nameDrug.value)
      // console.log(sizeDose.value)
      // console.log(qty.value)
      // console.log(pricePerQty.value)

      if (qtyType.value === 'etc') {
        QQtyp.value = qtyType.value = customQtyType.value
        // console.log(customQtyType.value)
      } else {
        QQtyp.value = qtyType.value
        // console.log(qtyType.value)
      }

      if (doseType.value === 'etc') {
        DDoseType.value = customDoseType.value
        // console.log(customDoseType.value)
      } else {
        DDoseType.value = doseType.value
        // console.log(doseType.value)
      }

      const formData = {
        nameDrug: inputNameDrug.value,
        dose: sizeDose.value,
        qty: qty.value,
        pricePerQty: pricePerQty.value,
        qtyType: QQtyp.value,
        doseType: DDoseType.value,
        stock: 0,
        status: 'close'
      };

      try {
        Swal.fire({
          title: 'ยืนยันการเพิ่มยา',
          text: "กรุณากดยืนยันเพื่อดำเนินการต่อ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'success',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ยืนยัน',
          customClass: {
            icon: 'custom-icon-class',
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            content: 'custom-content-class',
            text: 'custom-content-class',
            confirmButton: 'custom-confirm-button-class',
            cancelButton: 'custom-cancel-button-class',
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              Swal.fire({
                icon: "info",
                title: "กำลังเพิ่มข้อมูล",
                text: "กรุณารอสักครู่...",
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              const token = JSON.parse(localStorage.getItem('token'));
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }
              const response = await axios.post(import.meta.env.VITE_API_BASE_URL +'/drug/drug/addDrug',
                  formData,
                  config
              );
              console.log(response)
              Swal.fire(
                  'เพิ่มข้อมูลสำเร็จ',
                  'เพิ่มข้อมูลยาสำเร็จ',
                  'success'
              );
              setTimeout(() => {
                location.reload();
              }, 1500);


            } catch (error) {
              Swal.hideLoading();
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถพิมพ์ได้",
              });
            }
          }
        })

      } catch (error) {
        console.log(error)
      }

    };

    return {
      handleInput,
      filteredItems,
      Drug,
      doseType,
      qtyType,
      inputNameDrug,
      sizeDose,
      qty,
      customQtyType,
      customDoseType,
      pricePerQty,
      tableColumns,
      showCustomQtyType,
      showCustomDoseType,
      AddDrug,
      checkQtyType,
      checkDoseType
    }
  },


}

</script>
<style scoped>

</style>