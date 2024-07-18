<template>
  <a-layout style="min-height: 100vh" has-sider>
    <a-layout-sider id="components-layout-demo-side" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="clickMenu('1', '/top/targetList')">
          <pie-chart-outlined />
          <span>イベント検索</span>
        </a-menu-item>
        <a-menu-item key="2" @click="clickMenu('2', '/top/qrcode')">
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
      <a-layout-header :style="{ paddingRight: '20px', background: '#fff', height: '50px' }">
        <a-flex justify="flex-end" align="center" style="height: 45px">
          <a-row>
            <a-col>
              <a-avatar :size="35" style="background-color: #87d068">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a-col>
          </a-row>
        </a-flex>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{ route.name }}</a-breadcrumb-item>
        </a-breadcrumb>
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
import { goToOtherPage } from '@/router';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const clickMenu = (key: string, path: string) => {
  selectedKeys.value = [key];
  goToOtherPage(path);
};

const selectedKeys = ref<string[]>(['1']);
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
