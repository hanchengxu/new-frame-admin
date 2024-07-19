<template>
  <a-layout style="min-height: 100vh" has-sider>
    <a-layout-sider id="components-layout-demo-side" collapsible breakpoint="lg">
      <div class="logo" />
      <a-menu v-model:selectedKeys="getActiveMenu" theme="dark" mode="inline">
        <a-menu-item key="1" @click="clickMenu('1', 'targetList')">
          <pie-chart-outlined />
          <span>イベント検索</span>
        </a-menu-item>
        <a-menu-item key="2" @click="clickMenu('2', 'qrcode')">
          <desktop-outlined />
          <span>QRコード管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>Test4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ paddingLeft: '20px', paddingRight: '20px', background: '#fff', height: '50px' }">
        <a-flex justify="space-between" align="center" style="height: 45px">
          <a-breadcrumb>
            <template v-for="(breadcrumb, index) in breadcrumbList" :key="index">
              <a-breadcrumb-item v-if="index != breadcrumbList.length - 1">
                <RouterLink :to="{ name: breadcrumb.routeName }">{{ breadcrumb.breadcrumbName }}</RouterLink>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-else>
                {{ breadcrumb.breadcrumbName }}
              </a-breadcrumb-item>
            </template>
          </a-breadcrumb>
          <a-avatar :size="35" style="background-color: #87d068">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-flex>
      </a-layout-header>
      <a-layout-content style="margin: 12px 16px">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> XXX ©2024 Created by XXX </a-layout-footer>
    </a-layout>
    <a-back-top :visibility-height="0" />
  </a-layout>
</template>
<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();

const globalStore = useGlobalStore();
const { getActiveMenu, breadcrumbList } = storeToRefs(globalStore);

const clickMenu = (key: string, routerName: string) => {
  if (route.name !== routerName) {
    globalStore.router.push({ name: routerName });
    globalStore.setActiveMenu(key);
  }
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
