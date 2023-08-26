<template>
  <label class="sr-only" for="underline_select">Underline select</label>
  <select id="underline_select"  v-model="searchInput"
          @change="handleSearch"
          class="block py-2.5 px-2 cursor-pointer w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option value="" selected>เลือกกลุ่มสินค้า (ทั้งหมด)</option>
    <option value="G12">G12 : ผงรสมะนาว</option>
    <option value="G13">G13 : น้ำจิ้มไก่</option>
    <option value="G03">G03 : น้ำจิ้มไก่</option>
    <option value="G02">G02 : ผงทำซุปน้ำใส</option>
    <option value="G11">G11 : ผงปรุงรส</option>
    <option value="G04">G04 : ผงปรุงรส</option>
    <option value="G05">G05 : ผงต้มยำ</option>
    <option value="G17">G17 : ผงต้มยำ</option>
    <option value="G06">G06 : ผงปรุงรสหมู</option>
  </select>
</template>

<script>
export default {
  props: {
    searchBar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchInput: this.searchBar,
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchInput);
    },
  },
};
</script>
