<template>
  <div class="p-4 sm:ml-24">
    <div class="p-4 mt-14">
      <div class="ml-8 overflow-y-scroll" style="height: 450px">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem :columns=tableColumns :data=Drug>
          </TableItem>
        </table>
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
import { useGetDrug } from "@/stores/index.js";
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
        {id: 'id', title: 'ลำดับ'},
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

    onMounted(() => {
      getDurg.getDrugToAddDrug();
    });

   return  {
     tableColumns,
      Drug
    }
  },


}

</script>
