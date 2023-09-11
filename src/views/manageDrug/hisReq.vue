<template>
  <div class="p-4 sm:ml-12">
    <div class="p-4 mt-8">
      <div class="ml-8">
        <div class=" mb-1 border-b border-gray-200 dark:border-gray-700 ml-8">
            <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center justify-between"
                data-tabs-toggle="#myTabContent" role="tablist">
              <div ref="" class="flex flex-row">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li class="mr-2">
                    <a
                        :class="{
                  'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                    tabs === 'req',
                  'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                    tabs !== 'req',
                }"
                        aria-current="page"
                        href="#"
                        @click="handleTabs('req')"
                    >ประวัติการเบิก</a
                    >
                  </li>
                  <li class="mr-2">
                    <a
                        :class="{
                  'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                    tabs === 'rec',
                  'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                    tabs !== 'rec',
                }"
                        href="#"
                        @click="handleTabs('rec')"
                    >ประวัติการรับเข้า</a
                    >
                  </li>
                </ul>
              </div>
              <SearchOrder :searchBar="textInput" @search="handleSearch"/>
            </ul>
        </div>
        <div class="ml-8 overflow-y-scroll h-[454px]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableReq :columns="tableColumns" :data="filteredHis">
              <template v-slot:count2="{ row }">
                <button
                    class="text-white mr-2 bg-blue-700 hover:bg-blue-800 font-medium items-center align-middle rounded-lg text-sm px-5 py-0.5"
                    type="button"
                    @click="showCreateAction(row.runnumber)">
                  <Icon icon="bx:message-alt-detail" width="20"/>
                </button>
                <button
                    class="text-white bg-red-700 hover:bg-red-800 font-medium items-center align-middle rounded-lg text-sm px-5 py-0.5"
                    type="button"
                    @click="showCreateAction(row.runnumber)">
                  <Icon icon="vscode-icons:file-type-pdf2" width="20"/>
                </button>
              </template>
            </TableReq>
          </table>
        </div>
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
          <Icon class="mr-3" icon="emojione-v1:document" width="24"/>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ใบเบิก
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
          <div class="flex flex-row justify-between">
            <div><span class="mr-5">เลขที่ : {{
                hisReqDetailHead[0].runnumber
              }}</span><span>ผู้เบิก : {{ hisReqDetailHead[0].user }}</span></div>

            <div>วันที่ : {{ hisReqDetailHead[0].dateReq }}</div>
          </div>
          <div class="border-b"></div>
          <div class="flex flex-row justify-center">
            <div>สรุปรายการเบิก</div>
          </div>
          <div class="flex flex-row justify-center w-full">
            <div class="h-[300px] w-[650px] overflow-y-scroll mt-0 mb-1 m-2">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tableCart :columns="tableColumnsDetail" :data="hisReqDetail">
                </tableCart>
              </table>
            </div>
          </div>


        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
              class=" flex justify-center items-center w-24 h-8  text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-1"
              type="button"
              @click="addRequis"
          >
            <Icon icon="vscode-icons:file-type-pdf2" width="30"/>
          </button>
          <button
              class="flex justify-center items-center w-24 h-8 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              type="button"
              @click="showCreateAction">
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import SearchOrder from "@/components/Search.vue";
import TableReq from '../../components/table.vue';
import SelectOption from "@/components/selectoption.vue";
import {computed, onMounted, ref} from "vue";
import {useHisData} from '../../stores'
import {Icon} from "@iconify/vue";
import Table from "@/components/table.vue";
import TableCart from "@/components/table.vue";

export default {
  components: {
    TableCart, Table,
    Icon,
    TableReq,
    SelectOption,
    SearchOrder
  },
  setup() {

    const tableColumns = computed(() => {
      return [
        {id: 'runnumber', title: 'เลขที่'},
        {id: 'dateReq', title: 'วันที่'},
        {id: 'user', title: 'ผู้เบิก'},
        {id: 'count', title: 'จำนวนยาที่เบิก'},
        {id: 'count2', title: 'ดูรายละเอียด'},
      ];
    });

    const tableColumnsDetail = computed(() => {
      return [
        {id: 'drugName', title: 'ยา'},
        {id: 'reqStock', title: 'จำนวนที่เบิก'},
      ];
    });

    const getHisreq = useHisData();

    const hisReq = computed(() => {
      return getHisreq.showGetHisReq;
    })

    const hisReqDetail = computed(() => {
      return getHisreq.showGetHisReqDetail;
    })

    const hisReqDetailHead = computed(() => {
      return getHisreq.showGetHisReqDetailHead;
    })

    onMounted(async () => {
      await getHisreq.getReq()
    })

    const ruuno = ref('')
    const user = ref('')
    const dateHis = ref('')
    const showcreate = ref(false)

    const showCreateAction = async (running) => {
      showcreate.value = !showcreate.value
      if (showcreate.value === true) {
        await getHisreq.getReqDetail(running)
        await getHisreq.getReqDetailHead(running)
        console.log(datahead)

      }
    }
    const tabs = ref("req");
    const handleTabs = async (tabName) => {
      tabs.value = tabName;
      await getHisreq.setTab(tabs.value)
      console.log("tabs value after click:", tabs.value);

    };

    // search bar start
    const textInput = ref("");
    const filteredHis = computed(() => {
      if (!textInput.value) {
        return hisReq.value;
      }
      const keyword = textInput.value.toLowerCase();
      return hisReq.value.filter(
          (item) =>
              item.runnumber.toLowerCase().includes(keyword) ||
              item.dateReq.toLowerCase().includes(keyword) ||
              item.user.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
     // console.log(searchText)
    };


    return {
      textInput,
      filteredHis,
      hisReqDetailHead,
      ruuno,
      tabs,
      user,
      dateHis,
      hisReqDetail,
      tableColumnsDetail,
      showcreate,
      hisReq,
      tableColumns,
      showCreateAction,
      handleTabs,
      handleSearch
    }
  }
}

</script>
<style scoped>

</style>