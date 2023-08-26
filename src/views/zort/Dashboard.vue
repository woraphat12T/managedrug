<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <svg
                class="w-10 h-10 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                />
              </svg>
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                Invoice ล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                {{ dashboardData.InvLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 h-32 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <svg
                class="w-10 h-10 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                />
              </svg>
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                Co ล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                {{ dashboardData.conoLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 h-50 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <svg
                class="w-10 h-10 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 19"
              >
                <path
                  d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
                />
                <path
                  d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"
                />
              </svg>
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                ลูกค้าล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                Shopee : {{ dashboardData.cuscodeOlazLastno }}
              </p>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                Lazada : {{ dashboardData.cuscodeOspeLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <span class="relative w-4 h-4 p-2 bg-blue-500 rounded-full">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              ออเดอร์ทั้งหมด
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderAll }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-2/3 h-2 bg-blue-500 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <span class="relative w-4 h-4 p-2 bg-yellow-300 rounded-full">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              รอปริ้นใบเสร็จธรรมดา
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderWaitPrint }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-2/3 h-2 bg-yellow-300 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <span class="relative w-4 h-4 p-2 bg-green-500 rounded-full">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              ปริ้นสำเร็จ
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderSuccessPrint }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-2/3 h-2 bg-green-500 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <span class="relative w-4 h-4 p-2 bg-blue-700 rounded-full">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              สต็อก zort
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.StockZort }} ชิ้น
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-100">
              <div
                class="absolute top-0 left-0 w-3/4 h-2 bg-blue-700 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <span class="relative w-4 h-4 p-2 bg-red-500 rounded-full">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              สต็อก ERP
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.StockM3 }} ชิ้น
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-2/3 h-2 bg-red-500 rounded"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "../../stores";
export default {
  setup() {
    const store = useDashboardStore();
    const dashboardData = computed(() => {
      return store.zortDashboard;
    });

    onMounted(() => {
      store.getDashboard();
    });

    return {
      dashboardData,
    };
  },
};
</script>
