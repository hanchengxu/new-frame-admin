<template>
  <a-button
    :disabled="useGlobalStore().getProcessing"
    :loading="useGlobalStore().getProcessing"
    :type="props.type ? props.type : 'primary'"
  >
    <slot></slot>
  </a-button>
</template>
<script setup lang="ts">
import { useGlobalStore } from '../../stores/global';
const props = defineProps(['type', 'shape', 'size ', 'loading ', 'disabled']);
</script>
