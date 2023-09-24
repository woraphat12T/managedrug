<template>
  <div class="p-4 sm:ml-24">
    <div class="p-4 mt-14">
      <div class=" mb-1 border-b border-gray-200 dark:border-gray-700 ml-8">
        <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center justify-between"
            data-tabs-toggle="#myTabContent" role="tablist">
          <div ref="" class="flex flex-row">
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li class="mr-2">
                <a
                    :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  tabs === 'all',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'all',
              }"
                    aria-current="page"
                    href="#"
                    @click="handleTabs('all')"
                >ทั้งหมด</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'CR',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'CR',
              }"
                    href="#"
                    @click="handleTabs('CR')"
                >เม็ด</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'ID',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'ID',
              }"
                    href="#"
                    @click="handleTabs('ID')"
                >น้ำ</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'EX',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'EX',
              }"
                    href="#"
                    @click="handleTabs('EX')"
                >ขวด</a
                >
              </li>
              <li class="ml-8">
                <SelectOption :searchBar="textInput" @search="handleSearch"/>
              </li>
            </ul>
          </div>
          <div>
            <SearchOrder :searchBar="textInput" @search="handleSearch"/>
          </div>
        </ul>
      </div>
      <div class="ml-8 overflow-y-scroll h-[454px]">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem :columns=tableColumns :data=filteredDrug>
            <template v-slot:nameDrug="{ row }">
              <span class="text-start flex justify-start">
                {{ row.nameDrug }}
              </span>


            </template>
            <template v-slot:status="{ row }">
              <button
                  @click="showCreateAction(row.id)"
                  class="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-xs w-12 mr-1 py-0.5"
                  type="button">
                แก้ไข
              </button>
              <button v-if="row.status === 'open'"
                      @click="updateStatus('open',row.id)"
                      class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs w-12 py-0.5 mr-1 dark:bg-green-600 dark:hover:bg-green-700"
                      type="button">

                เปิด
              </button>
              <button v-else
                      @click="updateStatus('close',row.id)"
                      class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xs w-12 py-0.5 mr-1  dark:bg-red-600 dark:hover:bg-red-700 "
                      type="button">
                ปิด
              </button>
            </template>
          </TableItem>
        </table>
      </div>
    </div>
  </div>


  <div v-if="showcreate" aria-hidden="true"
       class="fixed flex justify-center bg-gray-500 bg-opacity-80 top-10 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
       tabindex="-1">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <Icon icon="icon-park:edit-two" width="24" class="mr-2"/>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            แก้ไขข้อมูลยา
          </h3>
          <button
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              type="button"
              @click="showCreateAction">
            <Icon icon="heroicons:x-mark-20-solid" width="24"/>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="flex flex-row">
            <form class="mr-2" method="post"
                  @submit.prevent="editDrug">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="first_name">รหัสยา</label>
                  <input id="idDrug"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         :value=DrugEdit[0].id
                         disabled type="text">
                </div>
                <div>
                  <label class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="first_name">ชื่อยา</label>
                  <input id="nameDrug"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         :value=DrugEdit[0].nameDrug
                         required type="text">
                </div>
                <div>
                  <div class="flex items-center">
                    <div class="w-1/2 pr-2">
                      <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                             for="last_name">ขนาดโดส</label>
                      <input id="sizeDose"
                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             :value=DrugEdit[0].dose
                             required type="text">
                    </div>
                    <div class="w-1/2 pl-2">
                      <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                             for="last_name">หน่วยโดส</label>

                      <input
                          id="doseType"
                          class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          :value=DrugEdit[0].doseType
                          type="text"
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex items-center">
                    <div class="w-1/2 pr-2">
                      <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                             for="last_name">จำนวน/qty</label>
                      <input id="qty"

                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             :value=DrugEdit[0].qty
                             required type="number">
                    </div>
                    <div class="w-1/2 pl-2">
                      <label class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                             for="last_name">หน่วย</label>
                      <input
                          id="qtyType"
                          class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          :value=DrugEdit[0].qtyType
                          type="text"
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="visitors">ราคา/หน่วย</label>
                  <input id="pricePerQty"

                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         :value=DrugEdit[0].pricePerQty
                         required type="text">
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="visitors">จำนวนคงเหลือ</label>
                  <input id="stock"

                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         :value=DrugEdit[0].stock
                         required type="number">
                </div>
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                    class=" flex justify-center items-center w-24 h-8  text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-1"
                    type="submit"
                >
                  บันทึก
                </button>
                <button
                    class="flex justify-center items-center w-24 h-8 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                    type="button"
                    @click="showCreateAction">
                  ปิด
                </button>
              </div>
            </form>
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
import SearchOrder from "../../components/Search.vue";
import {useGetDrug, useManageDrug} from "@/stores/index.js";
import Swal from "sweetalert2";
import TableCart from "@/components/table.vue";
import Table from "@/components/table.vue";


export default {
  components: {
    Table, TableCart,
    Icon,
    SelectOption,
    TableItem,
    SearchOrder

  },
  setup() {

    const tableColumns = computed(() => {
      return [
        {id: 'id', title: 'ลำดับ'},
        {id: 'nameDrug', title: 'ชื่อยา'},
        {id: 'dose', title: 'หน่วยนับ'},
        {id: 'doseType', title: 'หน่วย'},
        {id: 'pricePerQty', title: 'ราคาต่อหน่วย'},
        {id: 'stock', title: 'คงเหลือ'},
        {id: 'status', title: '#'},
      ];
    });

    const getDurg = useGetDrug();
    const manageDrug = useManageDrug();

    const Drug = computed(() => {
      return getDurg.showGetDrug;
    });

    const DrugEdit = computed(() => {
      return getDurg.showDrugEdit;
    });

    // search bar start
    const textInput = ref("");
    const filteredDrug = computed(() => {
      if (!textInput.value) {
        return Drug.value;
      }
      const keyword = textInput.value.toLowerCase();
      return Drug.value.filter(
          (item) =>
              item.nameDrug.toLowerCase().includes(keyword) ||
              item.qtyType.toLowerCase().includes(keyword)
      );
    });

    const showcreate = ref(false)
    const showCreateAction = async (id) => {
      await getDurg.getDrugToEdit(id)
      showcreate.value = !showcreate.value
    }

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };

    const updateStatus = async (nowStatus, idDrug) => {
      console.log(nowStatus, '::::', idDrug)
      await manageDrug.updateStatus(idDrug, nowStatus)
      await getDurg.getDrugToShowDrug();
    }

    const editDrug = async () => {
      console.log(idDrug.value)
      await getDurg.updateDrugEdit(idDrug.value, nameDrug.value, sizeDose.value, doseType.value, qty.value, qtyType.value, pricePerQty.value, stock.value)
      showcreate.value = !showcreate.value
      await getDurg.getDrugToShowDrug();
    }

    onMounted(() => {
      getDurg.getDrugToShowDrug();
    });

    return {
      textInput,
      filteredDrug,
      tableColumns,
      Drug,
      showcreate,
      DrugEdit,
      editDrug,
      handleSearch,
      updateStatus,
      showCreateAction
    }
  },


}

</script>
