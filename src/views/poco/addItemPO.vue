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
    <div class="p-4 mt-12">
      <div class="ml-8">
        <div class="flex-row flex align-middle">
          <label
              class="block w-full h-8 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center"
              for="file_input">
            <input
                id="file_input"
                accept=".xlsx"
                aria-describedby="file_input_help"
                class="hidden"
                type="file"
                @change="displayFileName($event)">
            <div class="flex-center" style="height: 100%;">
              <Icon height="20" icon="line-md:cloud-up" width="20"/>
              <span>{{ fileName || 'อัปโหลดไฟล์' }}</span>
            </div>
          </label>
          <button
              :class="{
              'bg-green-500 w-32 hover:bg-green-800  py-2 hover:text-gray-200 text-xs font-medium': fileName,
              'bg-gray-400 w-32 cursor-not-allowed font-medium text-xs  py-2': !fileName
            }"
              :disabled="!fileName"
              class="rounded-lg w-32 ml-2 h-8 py-2 font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
              @click="uploadFile"
          >
            อัปโหลด
          </button>
          <a class="rounded-lg w-32 ml-1 h-8 bg-blue-500  hover:bg-blue-800  py-2 hover:text-gray-200  font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
             href="/pocoManage/addProduct">รีเฟรช</a>
        </div>
      </div>
      <div class="mb-1.5 mt-12 flex justify-start">
        <div>
          <span class="text-sm font-medium cursor-default ml-8">รายการราคาสินค้าล่าสุดที่อัปเดต วันที่</span>
          <span v-if="product === undefined" class="text-sm font-medium cursor-default"> ----/--/--</span>
          <span v-else class="text-sm font-medium cursor-default"> : {{ dateLastShow }}</span>
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
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  tabs === 'all',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'all',
              }"
                    aria-current="page"
                    href="#"
                    @click="handleTabs('all')"
                >All</a
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
                >CR</a
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
                >ID</a
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
          <div class="flex-row flex">
            <li><span v-if="product !== null"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-default">จำนวนทั้งหมด {{
                product.length
              }} ชิ้น</span>
              <span v-else class="inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-default">จำนวนทั้งหมด 0 ชิ้น</span>
            </li>
            <li class="mt-3 flex flex-row">
              <button v-if=" product === undefined || product.length === 0 "
                      class="bg-gray-400 w-32   rounded-lg cursor-not-allowed  ml-2 h-8 py-2 font-medium text-xs text-white  flex items-center justify-center"
                      disabled
              >
                อัปเดตสินค้า
              </button>

              <button v-else
                      class="bg-green-500 w-32 hover:bg-green-800  hover:text-gray-200  rounded-lg  ml-2 h-8 py-2 font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
                      @click="updateItem"
              >
                อัปเดตสินค้า
              </button>
              <button v-if="product === undefined || product.length === 0  "

                      class="bg-gray-400 w-32   rounded-lg cursor-not-allowed  ml-2 h-8 py-2 font-medium text-xs text-white  flex items-center justify-center"
                      disabled>
                เคลียร์ข้อมูล
              </button>
              <button v-else
                      class="bg-red-500 w-32 hover:bg-red-800  hover:text-gray-200  rounded-lg  ml-2 h-8 py-2 font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
                      @click="deletePreItem"
              >
                เคลียร์ข้อมูล
              </button>
            </li>
          </div>
        </ul>
      </div>

      <div class="ml-8 overflow-y-scroll" style="height: 450px">
        <table class="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem v-if="dataProduct === null || product.length > 0" :columns=tableColumns :data=filteredItems>
            <template v-slot:pricePerCTN="{ row }">
              <span v-if="row.pricePerCTN === null"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ไม่มีราคา</span>
              <span v-else
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                  row.pricePerCTN
                }}</span>
            </template>
            <template v-slot:statusActive12T="{ row }">
              <span v-if="row.statusActive12T === null"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ไม่มีราคา</span>
              <span v-else
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                  row.statusActive12T
                }}</span>
            </template>
            <template v-slot:statusActiveFplus="{ row }">
              <span v-if="row.statusActiveFplus === null"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ไม่มีราคา</span>
              <span v-else
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                  row.statusActiveFplus
                }}</span>
            </template>
            <template v-slot:productName="{ row }">
              <div
                  class="text-start">
                {{ row.productName }}
              </div>
            </template>
          </TableItem>
          <TableItem v-else :columns=tableColumns :data=filteredItems>
            <template v-slot:pricePerCTN="{ row }">
                <span v-if="row.pricePerCTN === null"
                      class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    ไม่มีราคา
                </span>
              <span v-else>
                    {{ row.pricePerCTN }}
                </span>
            </template>
            <template v-slot:productName="{ row }">
              <div
                  class="text-start">
                {{ row.productName }}
              </div>
            </template>
            <template v-slot:statusActive12T="{ row }">
              <span v-if="row.statusActive12T === '0'"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"> close </span>
              <span v-else
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"> open </span>
            </template>
            <template v-slot:statusActiveFplus="{ row }">
              <span v-if="row.statusActiveFplus === '0'"
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"> close </span>
              <span v-else
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"> open </span>
            </template>
          </TableItem>
        </table>
      </div>


      <div v-if="showProgressModal"
           class="fixed transition duration-150 ease-in-out z-50 inset-0 flex justify-center items-center bg-black bg-opacity-75 ">
        <div class="bg-white p-4 w-60 rounded-lg shadow-md">

          <div class="h-1 rounded-lg w-full bg-gray-200">
            <div :style="{ width: uploadProgress + '%' }" class="h-1 rounded-lg bg-green-500"></div>
          </div>

          <div v-if="uploadProgress <= 100" class="mt-2 text-center text-gray-600 dark:text-gray-400">
            {{ uploadProgress }}%
          </div>
          <div v-else class="text-center text-gray-600 dark:text-gray-400">{{ uploadProgress }}</div>
          <div class="mt-2 flex justify-center">
            <div v-if="uploadProgress < 100" class="loader">กำลังอัพโหลดไฟล์ ...</div>
            <div v-else-if="uploadProgress === 100" class="loader">กำลังประมวลผลไฟล์ ...</div>
            <div v-else-if="uploadProgress === 'well done'" class="loader"></div>
            <div v-if="uploadStatus === 200">
              อัพโหลดสำเร็จ
            </div>
            <div v-else-if="uploadStatus === 500">
              รูปแบบในเนื้อหาไฟล์ไม่ถูกต้อง
            </div>
            <div v-else>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {computed, onMounted, ref} from 'vue'; // เพิ่ม ref เข้ามา
import {useClearPreItem, useGetDate, usePocoAddItemStore, usePocoGetItemStore, useTabStore} from '../../stores';
import TableItem from '../../components/table.vue';
import {Icon} from '@iconify/vue';
import Swal from "sweetalert2";

import SearchOrder from "../../components/searchbar.vue";
import SelectOption from "../../components/selectoption.vue";


export default {
  components: {
    SelectOption,
    SearchOrder,
    TableItem,
    Icon,
  },
  setup() {
    const tableColumns = computed(() => {
      return [
        {id: 'channel', title: 'ช่องทาง'},
        {id: 'group', title: 'กลุ่ม'},
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
        {id: 'statusActive12T', title: 'สถานะ 12T'},
        {id: 'statusActiveFplus', title: 'สถานะ Fplus'},
      ];
    });
    const store = usePocoGetItemStore();
    const getDate = useGetDate();
    const clearPre = useClearPreItem();
    const addItem = usePocoAddItemStore();
    const tabStore = useTabStore();

    const product = computed(() => {
      return store.pocoGetItem;
    });

    const dateLast = computed(() => {
      return getDate.getDateLast;
    })

    // search bar start
    const textInput = ref("");
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


    onMounted(() => {
      store.getPreItem();
    });

    onMounted(() => {
      getDate.getDateData();
    })

    const dateLastShow = dateLast
    const tabs = ref("all");
    const fileName = ref(null);
    const uploadProgress = ref(0);
    const showProgressModal = ref(false);
    const uploadStatus = ref(null);

    const dataProduct = ref(null);

    const handleTabs = async (tabName) => {
      tabs.value = tabName;
      await store.setTab(tabs.value)
      console.log("tabs value after click:", tabs.value);

    };

    const displayFileName = (event) => {
      if (event.target.files.length > 0) {
        fileName.value = event.target.files[0].name;
      } else {
        fileName.value = null;
      }
    };

    const deletePreItem = async () => {
      try {
        Swal.fire({
          icon: "warning",
          title: "กำลังลบข้อมูลไฟล์",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await clearPre.ClearItem();
        Swal.fire(
            'ลบสำเร็จ',
            'กดปุ่มยืนยันเพื่อดำเนินการต่อ',
            'success'
        )
        setTimeout(() => {
          location.reload();
        }, 1500);

      } catch (error) {
        Swal.hideLoading();
        console.log(error)
      }
    }
    const updateItem = () => {
      try {
        Swal.fire({
          title: 'ยืนยันการอัปเดตสินค้า',
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
                title: "กำลังอัปเดตข้อมูล",
                text: "กรุณารอสักครู่...",
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              await addItem.addPreItem();
              Swal.fire(
                  'อัปเดตสำเร็จ',
                  'อัปเดตข้อมูลสินค้าสำเร็จ',
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


    const uploadFile = async () => {
      if (!fileName.value) {
        return;
      }

      const fileInput = document.getElementById('file_input');
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('ItemMaster', file);


      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
          onUploadProgress: (progressEvent) => {
            uploadProgress.value = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
        showProgressModal.value = true;

        const response = await axios.post(
            import.meta.env.VITE_API_URL +
            '/PurchaseCustomerOrder/file/FileManage/addFile',
            formData,
            config
        );
        console.log(response.status)
        if (response.status === 200) {
          uploadProgress.value = 'well done';
          uploadStatus.value = 200;
          dataProduct.value = response.data.list;
          console.log(response.data.list);
        } else {
          uploadProgress.value = 'Not upload';
          uploadStatus.value = 400;
          console.log(response.status);
        }
      } catch (error) {
        uploadProgress.value = 'Error file';
        uploadStatus.value = 500;
        console.error(error.response.status);
      } finally {
        setTimeout(() => {
          showProgressModal.value = false;
          uploadProgress.value = 0;
          uploadStatus.value = null;
          location.reload();
        }, 2000);
      }
    };
    // console.log(product.length)

    const beforeDestroy = () => {
      showProgressModal.value = false;
      uploadProgress.value = 0;
      uploadStatus.value = null;
    };

    return {
      handleSearch,
      textInput,
      handleTabs,
      tabs,
      filteredItems,
      deletePreItem,
      dateLastShow,
      updateItem,
      tableColumns,
      product,
      fileName,
      uploadProgress,
      showProgressModal,
      uploadStatus,
      dataProduct,
      displayFileName,
      uploadFile,
      beforeDestroy,
    };
  },
};
</script>
<style>
.custom-icon-class {
  font-size: 10px;
}

.custom-title-class {
  font-size: 18px;
}

.custom-content-class {
  font-size: 10px;
}
</style>
