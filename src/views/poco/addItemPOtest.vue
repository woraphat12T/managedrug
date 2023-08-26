<template>
  
    <div class="p-4 sm:ml-48">
      <div class="p-4 mt-14">
        <v-select
        ref="productSelect"
        v-model="selectedProduct"
        :options="productOptions"
        label="label"
        placeholder="ค้นหาสินค้า..."
        @keydown.native.up="handleArrowUp"
        @keydown.native.down="handleArrowDown"
        @keydown.native.enter="handleEnter"
      />
          
      </div>
    </div>
  </template>
  <style>
.v-select .vs__dropdown-menu .vs__dropdown-item--highlight {
  background-color: #e2e8f0; /* สีพื้นหลังที่จะให้ highlight */
}
</style>
  <script>
import { ref, computed } from "vue";
import vSelect from "vue3-select";

export default {
  components: {
    vSelect,
  },
  setup() {
    const products = [
      { name: "Apple MacBook Pro 17\"", color: "Silver", category: "Laptop", price: "$2999" },
      { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
      { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
      { name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
      { name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
      { name: "Product 6", color: "Color 6", category: "Category 6", price: "$123" },
      { name: "Product 7", color: "Color 7", category: "Category 7", price: "$456" },
      { name: "Product 8", color: "Color 8", category: "Category 8", price: "$789" },
      { name: "Product 9", color: "Color 9", category: "Category 9", price: "$987" },
    ];

    const selectedProduct = ref(null);
    const productSelectRef = ref(null);
    const selectedIndex = ref(-1);

    const productOptions = computed(() => {
      return products.map((product) => ({ label: product.name, value: product }));
    });

    const handleArrowUp = () => {
      if (selectedIndex.value > 0) {
        selectedIndex.value--;
      }
    };

    const handleArrowDown = () => {
      if (selectedIndex.value < products.length - 1) {
        selectedIndex.value++;
      }
    };

    const handleEnter = () => {
  if (!selectedProduct.value && products.length > 0) {
    selectedProduct.value = products[0];
    console.log("สินค้าที่ถูกเลือก:", selectedProduct.value);
    
    selectedProduct.value = null;
    
  } else if (selectedProduct.value) {
    console.log("สินค้าที่ถูกเลือก:", selectedProduct.value);
    
    selectedProduct.value = null;
    
  }
   // ถ้าไม่พบข้อมูลที่ตรงกันในค้นหา
      if (products.length === 0 || !selectedProduct.value) {
        selectedProduct.value = null;
      }
  if (productSelectRef.value) {
        productSelectRef.value.focus();
      }
 
};

    return {
      products,
      selectedProduct,
      productOptions,
      handleArrowUp,
      handleArrowDown,
      handleEnter,
      productSelectRef,
    };
  },
};

</script>
