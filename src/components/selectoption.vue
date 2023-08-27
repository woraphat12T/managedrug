<template>
  <select id="underline_select" v-model="searchInput" @change="handleSearch"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected value="">เลือกหน่วยโดส</option>
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
