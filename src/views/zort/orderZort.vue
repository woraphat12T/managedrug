<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4"
      >
        <div class="mr-auto">
          <CountOrder :data="filteredItems" />
        </div>
        <div class="flex items-center sm:order-1 mb-4 sm:mb-0 ml-4">
          <SearchOrder :searchBar="textInput" @search="handleSearch" />
        </div>
        <a
          @click="printReceipt()"
          :href="
            'http://58.181.206.156:8080/12Trading/zort_pdf/printReceipt.php?checklist=' +
            selected
          "
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 dark:bg-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-800 sm:ml-4"
          :class="{ 'pointer-events-none': !isItemSelected }"
        >
          พิมพ์ใบเสร็จ
          {{ selected.length > 0 ? selected.length + " ใบ" : "" }}
        </a>
      </div>

      <div
        class="text-sm font-medium text-center mb-1 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white rounded-lg"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <a
              href="#"
              @click="handleTabs('wait-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  tabs === 'wait-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'wait-tab',
              }"
              aria-current="page"
              >รอพิมพ์</a
            >
          </li>
          <li class="mr-2">
            <a
              href="#"
              @click="handleTabs('success-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'success-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'success-tab',
              }"
              >พิมพ์สำเร็จ</a
            >
          </li>

          <li class="mr-2">
            <a
              href="#"
              @click="handleTabs('payment-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'payment-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'payment-tab',
              }"
              >รอชำระ</a
            >
          </li>
        </ul>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableOrder
          :columns="tableColumns"
          :data="filteredItems"
          :selected="selected"
          @update:selected="onSelectedUpdate"
        >
          <template v-slot:number="{ row }">
            <div class="flex items-center justify-center">
              <span>
                {{ row.number }}

                <div
                  v-if="row.invstatus !== ''"
                  class="text-blue-800 text-xs font-medium ml-0 px-1 py-0.5 rounded-full dark:text-blue-300"
                >
                  <svg
                    class="w-3 h-3 text-gray-800 dark:text-white mr-1 inline-flex"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 19 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"
                    />
                  </svg>
                  {{ row.invstatus }}
                </div>
              </span>
            </div>
          </template>
          <template v-slot:status="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.status === 'Success'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.statusText }}
              </span>
              <span
                v-if="row.status === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.statusText }}
              </span>
              <span
                v-if="row.status === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.statusText }}
              </span>
              <span
                v-if="row.status === 'Waiting'"
                class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                {{ row.statusText }}
              </span>
            </div>
          </template>
          <template v-slot:paymentstatus="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.paymentstatus === 'Paid'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.paymentstatusText }}
              </span>
              <span
                v-if="row.paymentstatus === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.paymentstatusText }}
              </span>
              <span
                v-if="row.paymentstatus === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.paymentstatusText }}
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
              <span :title="row.saleschannel"></span>
            </div>
          </template>
        </TableOrder>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import Swal from "sweetalert2";
import router from "../../router";
import CountOrder from "./orderCount.vue";
import SearchOrder from "../../components/searchbar.vue";
import TableOrder from "../../components/tableCheckbox.vue";
export default {
  components: {
    CountOrder,
    SearchOrder,
    TableOrder,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }

    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "วันที่" },
        { id: "number", title: "รายการ" },
        { id: "customer", title: "ลูกค้า" },
        { id: "amount", title: "มูลค่า" },
        { id: "status", title: "สถานะ" },
        { id: "paymentstatus", title: "ชำระเงิน" },
        { id: "saleschannel", title: "ช่องทาง" },
        { id: "totalprint", title: "printcount" },
      ];
    });

    const store = useOrderStore();
    const orders = computed(() => {
      return store.zortOrder;
    });

    const printReceipt = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังพิมพ์",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.getOrderZort();
        await afterPrint();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "พิมพ์สำเร็จ",
        });
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถพิมพ์ได้",
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
      await clearCheckbox();
      // await store.getOrderZort();
      // await clearCheckbox();
    };

    const afterPrint = async () => {
      await store.getOrderZort();
      await handleTabs('success-tab');
    };

    const checkbox = useUtilityStore();
    const clearCheckbox = async () => {
      checkbox.updateSelectedCheckboxes([]);
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
          item.saleschannel.toLowerCase().includes(keyword) ||
          item.status.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    onMounted(() => {
      store.getOrderZort();
    });

    return {
      tableColumns,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      handleTabs,
      tabs,
      printReceipt,
      clearCheckbox,
      afterPrint,
    };
  },
};
</script>
