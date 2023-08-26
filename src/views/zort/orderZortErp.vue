<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex flex-col-reverse sm:flex-row justify-end items-center mb-2"
      >
        <div class="mr-auto">
          <CountOrderErp :data="filteredItems" />
        </div>
        <button
          @click="addOrder()"
          type="button"
          class="bg-green-500 hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
        >
          นำเข้าระบบ
        </button>
        <div class="flex items-center sm:order-2 mb-4 sm:mb-0 ml-4">
        <SearchBar :searchBar="textInput" @search="handleSearch" />
      </div>
      </div>
      <div class="flex items-center mb-3">
          <span class="text-xl font-normal"> inv ล่าสุด {{ inv.InvLastno }} </span>
      </div>

      <div
        class="text-sm font-medium text-center mb-1 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white rounded-lg"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <a
              @click="handleTabs('wait-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  tabs === 'wait-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'wait-tab',
              }"
              aria-current="page"
              >รอนำเข้าระบบ</a
            >
          </li>
          <li class="mr-2">
            <a
              @click="handleTabs('success-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'success-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'success-tab',
              }"
              >นำเข้าระบบสำเร็จ</a
            >
          </li>
        </ul>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table :columns="tableColumns" :data="filteredItems">
          <template v-slot:status="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.status === 'Success'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Waiting'"
                class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                {{ row.status }}
              </span>
            </div>
          </template>
          <template v-slot:paymentstatus="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.paymentstatus === 'Paid'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.paymentstatus }}
              </span>
            </div>
          </template>
          <template v-slot:saleschannel="{ row }">
            <div class="flex items-center justify-center">
              <img
                v-if="row.saleschannel === 'Shopee'"
                src="/shopee-icon.png"
                width="25"
                class="mr-1"
              />
              <img
                v-else-if="row.saleschannel === 'Lazada'"
                src="/lazada-icon.png"
                width="25"
                class="mr-1"
              />
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useOrderStore, useDashboardStore } from "../../stores";
import Swal from "sweetalert2";
import SearchBar from "../../components/searchbar.vue";
import Table from "../../components/table.vue";
import CountOrderErp from "./orderCount.vue";
export default {
  components: {
    SearchBar,
    Table,
    CountOrderErp
  },
  setup() {

    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "วันที่" },
        { id: "cono", title: "CO" },
        { id: "invno", title: "INV" },
        { id: "number", title: "รายการ" },
        { id: "customer", title: "ลูกค้า" },
        { id: "amount", title: "มูลค่า" },
        { id: "status", title: "สถานะ" },
        { id: "saleschannel", title: "ช่องทาง" },
      ];
    });

    const store = useOrderStore();
    const orders = computed(() => {
      return store.zortOrder;
    });
    
    const storeDb = useDashboardStore();
    const inv = computed(() => {
      return storeDb.zortDashboard;
    });

    const addOrder = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังนำเข้าระบบ",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.addOrderErp();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "นำเข้าระบบสำเร็จ",
        });
        await afterAdded();
      } catch (error) {
        console.log(error);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถนำเข้าระบบได้",
        });
      }
    };

    const selected = ref([]);
    const isItemSelected = ref(false);
    const onSelectedUpdate = (newValue) => {
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;
    };

    const tabs = ref("wait-tab");
    const handleTabs = async (tabName) => {
      tabs.value = tabName;
      console.log("tabs value after click:", tabs.value);
      await store.setTab(tabs.value);
    };

    const afterAdded = async () => {
      await store.getOrderZort();
      await handleTabs('success-tab');
    };

    // search bar start
    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return orders.value;
      }
      const keyword = textInput.value.toLowerCase();
      return orders.value.filter(
        (item) =>
          item.number.toLowerCase().includes(keyword) ||
          item.customer.toLowerCase().includes(keyword) ||
          item.orderdateString.toLowerCase().includes(keyword) ||
          item.saleschannel.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    onMounted(() => {
      store.getOrderZort();
      storeDb.getDashboard();
    });

    return {
      tableColumns,
      addOrder,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      handleTabs,
      tabs,
      afterAdded,
      inv,
    };
  },
};
</script>
