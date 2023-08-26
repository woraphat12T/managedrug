<style xmlns="">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  color: blue;
  border-bottom: 2px solid blue;
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

.flash-label {
  animation: flash 5s infinite;
  font-weight: bold;
  color: red;
  font-size: smaller;
}

</style>
<template>
  <div class="p-4 sm:ml-20">
    <div class="p-4 mt-1">
      <div class="mb-1.5 mt-12 flex justify-start mb-4">
        <div>
          <span class="text-sm font-medium cursor-default ml-8">รายการราคาสินค้าล่าสุดที่อัปเดต วันที่</span>
          <span v-if="product === undefined" class="text-sm font-medium cursor-default"> ----/--/--</span>
          <span v-else class="text-sm font-medium cursor-default"> : {{ dateLastShow }}</span>
          <span v-if="product !== null"
                class="text-sm font-medium cursor-default ml-2">จำนวนทั้งหมด {{
              product.length
            }} ชิ้น <span
                class="bg-green-500 text-red-800 text-xs font-medium mr-1 ml-1  px-2 py-0 rounded-full dark:bg-red-900 dark:text-red-300"></span><span
                class="text-sm font-medium cursor-default">296 ชิ้น</span> <span
                class="bg-red-500 text-red-800 text-xs font-medium mr-1 ml-1  px-2 py-0 rounded-full dark:bg-red-900 dark:text-red-300"></span><span
                class="text-sm font-medium cursor-default">40 ชิ้น</span></span>
          <span v-else class="text-sm font-medium cursor-default ml-8">จำนวนทั้งหมด 0 ชิ้น</span>
        </div>
      </div>

      <div class=" mb-1 border-b border-gray-200 dark:border-gray-700 ml-8">
        <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center justify-between"
            data-tabs-toggle="#myTabContent" role="tablist">
          <div ref="" class="flex flex-row">
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li class="mr-2">
                <a
                    :class="{
                ' text-blue-600  border-blue-600  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'all',
                ' border-transparent  hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'all',
              }"
                    aria-current="page"
                    class="inline-block p-3 border-b-2 rounded-t-lg"
                    href="#"
                    @click="handleTabs('all')"
                >All</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                ' text-blue-600 border-blue-600   dark:text-blue-500 dark:border-blue-500':
                  tabs === 'CR',
                '  border-transparent  hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'CR',
              }"
                    class="inline-block p-3 rounded-t-lg border-b-2"
                    href="#"
                    @click="handleTabs('CR')"
                >CR</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                'text-blue-600  border-blue-600  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'ID',
                'border-transparent hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'ID',
              }"
                    class="inline-block p-3 border-b-2 rounded-t-lg"
                    href="#"
                    @click="handleTabs('ID')"
                >ID</a
                >
              </li>
              <li class="mr-2">
                <a
                    :class="{
                'p-3 text-blue-600  border-blue-600   dark:text-blue-500 dark:border-blue-500':
                  tabs === 'EX',
                ' border-transparent hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'EX',
              }"
                    class="inline-block p-3 border-b-2 rounded-t-lg"
                    href="#"
                    @click="handleTabs('EX')"
                >EX</a
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

          <div class="flex align-middle h-10 ">
            <button
                :class="{
                  ' bg-yellow-300 hover:bg-yellow-200 font-medium rounded-lg text-sm text-center inline-flex items-center px-3 mr-2':formattedDate !== 'notup',
                  ' bg-gray-300 cursor-not-allowed  font-medium rounded-lg text-sm text-center inline-flex items-center px-3 mr-2':formattedDate === 'notup'
                }"
                class="text-white"
                type="button">
              <Icon class="mr-1" height="24" icon="material-symbols:update" width="24"/>
              อัปเดตเป็นเดือนปัจจุุบัน
            </button>
            <button
                class="text-white bg-blue-600 hover:bg-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center px-3"
                type="button">
              <Icon class="mr-1" height="22" icon="icon-park-outline:ad-product" width="22"/>
              เปิดใช้งานสินค้าทั้งหมด
            </button>
          </div>
        </ul>
      </div>

      <div class="ml-8 overflow-y-scroll" style="height:500px">
        <table class="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem v-if="product === null || product.length > 0" :columns=tableColumns :data=filteredItems>
            <template v-slot:pricePerCTN="{ row }">
                <span
                    :class="{
                   'bg-red-100 text-red-800' : row.pricePerCTN === null ,
                  }"
                    class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {{ row.pricePerCTN === null ? 'ไม่มีราคา' : row.pricePerCTN }}
                </span>
            </template>
            <template v-slot:statusActive12T="{ row }">
               <span
                   :class="{
                  'bg-red-100 text-red-800' :  row.statusActive12T === 'close',
                   'bg-green-100 text-green-800' :  row.statusActive12T === 'open'
                }"
                   class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
               >
                {{ row.statusActive12T }}
              </span>
            </template>
            <template v-slot:statusActiveFplus="{ row }">
               <span
                   :class="{
                   'bg-red-100 text-red-800' : row.statusActiveFplus === 'close',
                   'bg-green-100 text-green-800' : row.statusActiveFplus === 'open'
                }"
                   class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
               >
                {{ row.statusActiveFplus }}
              </span>
            </template>
            <template v-slot:productName="{ row }">
              <div
                  class="text-start">
                {{ row.productName }}
              </div>
            </template>
            <template v-slot:productId2="{ row }">
              <label class="relative inline-flex items-center mr-5 cursor-pointer">
                <input checked class="sr-only peer" type="checkbox" value="">
                <div
                    class="w-11 h-6 bg-red-200 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </template>
          </TableItem>
        </table>
      </div>


      <div v-if="showAlert"
           class="fixed transition duration-150 ease-in-out z-50 inset-0 flex justify-center items-center bg-black bg-opacity-75 ">
        <div class="bg-white p-4 w-100 rounded-lg shadow-md flex justify-center flex-col">
          <div class="flex justify-center m-5 mb-0">
            <Icon class="animate-bounce mb-1 text-yellow-400" height="120" icon="fe:warning" width="120"/>
          </div>
          <span class="ml-5 mr-5 font-medium text-xl">ข้อมูลเดือนที่อัปเดตล่าสุดไม่ตรงกับเดือนปัจจุบัน</span>
          <div class="flex justify-center mt-5">
            <button
                class="text-white bg-blue-600 hover:bg-blue-800 hover:text-gray-50 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                type="button"
                @click="nexts('aa')">
              ดำเนินการต่อ
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {computed, onMounted, ref} from 'vue'; // เพิ่ม ref เข้ามา
import {useGetDate, usePocoGetItemMasterStore} from '../../stores';
import TableItem from '../../components/table.vue';
import {Icon} from '@iconify/vue';

import SearchOrder from "../../components/searchbar.vue";
import SelectOption from "../../components/selectoption.vue";


export default {
  components: {
    SearchOrder,
    TableItem,
    Icon,
    SelectOption
  },
  setup() {
    const currentDate = new Date();
    const datevalid = ref('')
    const formattedDate = `${currentDate.getFullYear()}-${padNumber(
        currentDate.getMonth() + 1
    )}-${padNumber(currentDate.getDate())}`;

    function padNumber(number) {
      return number.toString().padStart(2, '0');
    }

    console.log(formattedDate)
    const tableColumns = computed(() => {
      return [
        {id: 'channel', title: 'ช่องทาง'},
        {id: 'group', title: 'กลุ่ม'},
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
        {id: 'statusActive12T', title: 'สถานะ 12T'},
        {id: 'statusActiveFplus', title: 'สถานะ Fplus'},
        {id: 'productId2', title: '#'},
      ];
    });
    const store = usePocoGetItemMasterStore();
    const getDate = useGetDate();
    const product = computed(() => {
      return store.pocoGetItemMaster;
    });

    const dateLast = computed(() => {
      return getDate.getDateLast;
    })

    //option
    // const yearsList = ref([])
    // const selectedYear = ref(null)
    //
    // const getYearsList = () => {
    //   const startYear = 1990;
    //   const endYear = new Date().getFullYear();
    //   for (let i = endYear; i >= startYear; i--) {
    //     yearsList.value = [...yearsList.value, i]
    //   }
    // }


    // search bar start
    const textInput = ref('');

    const filteredItems = computed(() => {
      if (!textInput.value) {
        return product.value;
      }

      const keyword = textInput.value.toLowerCase();

      return product.value.filter(
          (item) =>
              item.productName.toLowerCase().includes(keyword) ||
              item.group.toLowerCase().includes(keyword) ||
              item.statusActive12T.toLowerCase().includes(keyword) ||
              item.statusActiveFplus.toLowerCase().includes(keyword) ||
              item.productId.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };

    // onMounted(() => {
    //   getYearsList()
    // })


    onMounted(() => {
      store.getItemMaster();
    });

    onMounted(() => {
      getDate.getDateData();
    })

    const dateLastShow = dateLast
    const tabs = ref("all");
    const fileName = ref(null);
    const uploadProgress = ref(0);
    const showAlert = ref(false);
    const uploadStatus = ref(null);

    const dataProduct = ref(null);

    const handleTabs = async (tabName) => {
      tabs.value = tabName;
      await store.setTab(tabs.value)
      console.log("tabs value after click:", tabs.value);

    };

    if (dateLast.value !== formattedDate) {
      datevalid.value = 'notup'
      showAlert.value = true
    }

    const nexts = (vale) => {
      showAlert.value = false

    }

    const displayFileName = (event) => {
      if (event.target.files.length > 0) {
        fileName.value = event.target.files[0].name;
      } else {
        fileName.value = null;
      }
    };

    return {
      // selectedYear,
      // yearsList,
      datevalid,
      formattedDate,
      nexts,
      filteredItems,
      dateLastShow,
      handleSearch,
      textInput,
      handleTabs,
      tabs,
      tableColumns,
      product,
      fileName,
      uploadProgress,
      showAlert,
      uploadStatus,
      dataProduct,
      displayFileName,
    };
  },
};
</script>

