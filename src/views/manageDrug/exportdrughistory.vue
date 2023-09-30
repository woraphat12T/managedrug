

<template>
  <div class="p-4 sm:ml-16">
    <div class="p-4 mt-14">
      <span style="width: 500px" class="flex flex-row items-center ml-8">
            <Icon icon="solar:history-2-line-duotone" width="20" class="mr-2" color="#0ED3CF"/>
            รายการยาที่มีประวัติ
      </span>
      <div class="mb-2 flex flex-row justify-between">
        <div class="flex items-center justify-end ml-8">
          <span class="mr-5 w-52">
            จากปี
          </span>
          <select
              v-model="YearBudgetStart"
              class="block py-2.5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected disabled >เลือกปี</option>
            <option value="2022">2565</option>
            <option value="2023">2566</option>
          </select>
          <span  class="mr-1">
            เดือน
          </span>
          <select
              v-model="DateStart"
              class="block py-2.5 mr-5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected disabled>ถึงเดือน</option>
            <option value="01">มกราคม</option>
            <option value="02">กุมภาพันธ์</option>
            <option value="03">มีนาคม</option>
            <option value="04">เมษายน</option>
            <option value="05">พฤษภาคม</option>
            <option value="06">มิถุนายน</option>
            <option value="07">กรกฎาคม</option>
            <option value="08">สิงหาคม</option>
            <option value="09">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
          </select>
          <span  class="mr-1 w-1/2">
            ถึง ปี
          </span>
          <select
              v-model="YearBudgetStop"
              class="block py-2.5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected disabled >เลือกปี</option>
            <option value="2022">2565</option>
            <option value="2023">2566</option>
          </select>
          <span  class="mr-5">
            เดือน
          </span>
          <select
              v-model="DateEnd"
              class="block py-2.5 mr-5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option selected disabled>ถึงเดือน</option>
            <option value="01">มกราคม</option>
            <option value="02">กุมภาพันธ์</option>
            <option value="03">มีนาคม</option>
            <option value="04">เมษายน</option>
            <option value="05">พฤษภาคม</option>
            <option value="06">มิถุนายน</option>
            <option value="07">กรกฎาคม</option>
            <option value="08">สิงหาคม</option>
            <option value="09">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
          </select>
          <button @click="filterDrugMonth" type="button" class="text-white flex flex-row items-center h-8 bg-blue-700 hover:bg-blue-800 font-xs rounded-lg px-5 text-sm mr-2"><Icon icon="line-md:search" width="16" />ค้นหา</button>
        </div>
        <div class="flex items-center ml-8">
          <button
              class="text-white flex flex-row items-center bg-red-700 hover:bg-red-800 font-medium rounded-lg mr-2 text-xs px-12 h-8 align-middle"
              type="button"
              @click="showCreateAction(row.runnumber)">
            <Icon icon="vscode-icons:file-type-pdf2" width="16"/>
            <span class="mr-1">ปริ้นข้อมูลการใช้ยา</span>
          </button>
          <SearchOrder :searchBar="textInput" @search="handleSearch"/>
        </div>
      </div>
      <div class="ml-8 overflow-y-scroll h-[454px]">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableDrug
          :columns="tableColumns"
          :data="filteredDrug"
          :selected="selected"
          @update:selected="onSelectedUpdate"
      >
        <template v-slot:nameDrug="{row}">
          <div class="text-left">
            {{ row.nameDrug }}
          </div>
        </template>
      </TableDrug>
        </table>
      </div>
    </div>
    </div>
</template>
<script>
import {Icon} from '@iconify/vue';
import {computed, onMounted, ref} from "vue";
import TableDrug from '../../components/tableCheckbox.vue'
import Select from "../../components/selecet.vue";
import SearchOrder from "../../components/Search.vue";
import {useGetDrug, useManageDrug} from "@/stores/index.js";


export default {
  components: {
    Icon,
    TableDrug,
    SearchOrder

  },
  setup() {

    const tableColumns = computed(() => {
      return [
        {id: 'id', title: 'ลำดับ'},
        {id: 'nameDrug', title: 'ชื่อยา'},
        {id: 'countReq', title: 'จำนวนครั้งที่ถูกเบิก'},
        {id: 'countRec', title: 'จำนวนครั้งที่รับเข้า'},
      ];
    });

    const currentDate = ref(new Date());
    const formattedDate = computed(() => {
      const date = currentDate.value;
      // Format the date as desired (e.g., YYYY-MM-dd)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    });

    const DateEnd = ref(formattedDate.value.substring(5,7))
    const DateStart = ref('10')
    const YearBudgetStart = ref(parseInt(formattedDate.value.substring(0, 4))-1)
    const YearBudgetStop = ref(formattedDate.value.substring(0, 4))

    const getDurg = useGetDrug();

    const Drug = computed(() => {
      return getDurg.showGetDrugHis;
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
              item.nameDrug.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };

    const filterDrugMonth = async () => {
      const startDate = YearBudgetStart.value+'-'+DateStart.value
      const stopDate = YearBudgetStop.value+'-'+DateEnd.value
      console.log('Year month :'+startDate+' ถึง '+stopDate)
      await getDurg.getDrugHis(startDate,stopDate)
    }


    onMounted(() => {
      getDurg.getDrugHis();
    });



    return {
      YearBudgetStart,
      YearBudgetStop,
      DateStart,
      DateEnd,
      textInput,
      filteredDrug,
      tableColumns,
      Drug,
      filterDrugMonth,
      handleSearch,
    }
  },


}
</script>

<style scoped>

</style>