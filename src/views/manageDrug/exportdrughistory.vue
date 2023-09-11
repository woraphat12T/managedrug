

<template>
  <div class="p-4 sm:ml-24">
    <div class="p-4 mt-14">
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
    </div>
    </div>
</template>
<script>
import {Icon} from '@iconify/vue';
import {computed, onMounted, ref} from "vue";
import TableDrug from '../../components/tableCheckbox.vue'
import SelectOption from "../../components/selectoption.vue";
import SearchOrder from "../../components/Search.vue";
import {useGetDrug,useManageDrug} from "@/stores/index.js";


export default {
  components: {
    Icon,
    SelectOption,
    TableDrug,
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
        {id: 'status', title: '#'},
      ];
    });

    const getDurg = useGetDrug();
    const manageDrug = useManageDrug() ;

    const Drug = computed(() => {
      return getDurg.showGetDrug;
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

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };

    const updateStatus =async (nowStatus,idDrug) => {
      console.log(nowStatus,'::::',idDrug)
      await manageDrug.updateStatus(idDrug,nowStatus)
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
      handleSearch,
      updateStatus
    }
  },


}
</script>

<style scoped>

</style>