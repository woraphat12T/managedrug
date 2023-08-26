<template>
  <div>
    <div class="flex items-center">
      <div class="flex items-center mr-5">
        <img src="/shopee-icon.png" width="30" class="mr-2" />
        <span class="text-xl font-medium">{{ shopee }} รายการ</span>
      </div>
      <div class="flex items-center mr-5">
        <img src="/lazada-icon.png" width="30" class="mr-2" />
        <span class="text-xl font-medium">{{ lazada }} รายการ</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const shopee = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Shopee").length;
    });

    const lazada = computed(() => {
      return props.data.filter((item) => item.saleschannel === "Lazada").length;
    });

    return {
      shopee,
      lazada,
    };
  },
};
</script>
