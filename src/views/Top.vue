<template>
    <button @click="goToOtherPage('/A')">Go to A</button>
    <br>
    <button @click="goToOtherPage('/B')">Go to B</button>
</template>
<script setup lang="ts">

import { goToOtherPage } from '@/router/index';

</script>