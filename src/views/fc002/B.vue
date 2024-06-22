<template>
  <div>BBBB</div>
  <br />
  <div>A page's count: {{ useFc001Store().count }}</div>
  <br />
  <br />
  <button @click="goToOtherPage('/')">Go to Top</button>
  <button style="margin-left: 10px" class="button" @click="goToOtherPage('/A')">Go to A</button>
</template>
<script setup lang="ts">
import { goToOtherPage } from '@/router/index';
import { useFc001Store } from '@/stores/fc001';
</script>
