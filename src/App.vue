<template>
  <AConfigProvider :locale="jaJP">
    <AApp>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </AApp>
  </AConfigProvider>
</template>
<script lang="ts" setup>
import jaJP from 'ant-design-vue/es/locale/ja_JP';
</script>
<style scoped></style>
