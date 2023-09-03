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
          <TableItem :columns=tableColumns :data=Drug>
            <template v-slot:nameDrug="{ row }">
              <span class="text-start flex justify-start">
                {{ row.nameDrug }}
              </span>


            </template>
            <template v-slot:action="{ row }">
              <button
                  class="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-xs w-12 mr-1 py-0.5"
                  type="button">
                แก้ไข
              </button>
              <button
                  class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xs w-12 py-0.5 mr-1  dark:bg-red-600 dark:hover:bg-red-700 "
                  type="button">
                ปิด
              </button>
              <button
                  class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs w-12 py-0.5 dark:bg-green-600 dark:hover:bg-green-700"
                  type="button">
                เปิด
              </button>
            </template>
          </TableItem>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import {Icon} from '@iconify/vue';
import {computed, onMounted} from "vue";
import TableItem from '../../components/table.vue'
import SelectOption from "../../components/selectoption.vue";
import SearchOrder from "../../components/Search.vue";
import {useGetDrug} from "@/stores/index.js";


export default {
  components: {
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
        {id: 'doseType', title: 'หน่วย'},
        {id: 'pricePerQty', title: 'ราคาต่อหน่วย'},
        {id: 'stock', title: 'คงเหลือ'},
        {id: 'action', title: '#'},
      ];
    });

    const getDurg = useGetDrug();

    const Drug = computed(() => {
      return getDurg.showGetDrug;
    });

    onMounted(() => {
      getDurg.getDrugToAddDrug();
    });

    return {
      tableColumns,
      Drug
    }
  },


}

</script>
