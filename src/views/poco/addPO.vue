<style xmlns="">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
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
        เพิ่มรายการ
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {computed, onMounted, ref} from 'vue'; // เพิ่ม ref เข้ามา
import {usePocoGetItemStore} from '../../stores';
import TableItem from '../../components/table.vue';
import {Icon} from '@iconify/vue';


export default {
};
</script>
