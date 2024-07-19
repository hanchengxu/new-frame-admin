import router from '@/router';
import { defineStore } from 'pinia';
import { markRaw, ref } from 'vue';
import { RouteRecordName, Router } from 'vue-router';

import { message } from 'ant-design-vue';

type Breadcrumb = {
  breadcrumbName: string;
  routeName: RouteRecordName;
};

export interface GlobalState {
  processing: boolean;
  loginToken: string;
  router: Router; // システムルーター
  breadcrumbList: Breadcrumb[]; //パンくずリスト
  activeMenu: string; // 選択中のシステムメニュー
}

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      processing: false,
      loginToken: '',
      activeMenu: '',
      breadcrumbList: [] as Breadcrumb[],
      router: markRaw(router),
    };
  },

  getters: {
    getProcessing: (state) => state.processing,
    getLoginToken: (state) => state.loginToken,
    getActiveMenu: (state) => [state.activeMenu],
    hasBreadcrumb: (state) => {
      return (routeName: RouteRecordName): boolean => {
        return state.breadcrumbList.some((Breadcrumb) => Breadcrumb.routeName === routeName);
      };
    },
  },

  actions: {
    message(text: string, type?: string) {
      if (type) {
        switch (type) {
          case 'info':
            message.info(text);
            break;
          case 'success':
            message.success(text);
            break;
          case 'error':
            message.error(text);
            break;
          case 'warning':
            message.warning(text);
            break;
          default:
            message.info(text);
        }
      } else {
        message.info(text);
      }
    },
    startProcessing() {
      this.processing = true;
    },
    endProcessing() {
      this.processing = false;
    },
    setToken(token: string) {
      this.loginToken = token;
    },
    setActiveMenu(menuKey: string) {
      this.activeMenu = menuKey;
    },
    pushBreadcrumb(breadcrumbName: string, routeName: RouteRecordName) {
      this.breadcrumbList.push({
        breadcrumbName: breadcrumbName,
        routeName: routeName,
      });
    },
    setBreadcrumbList(breadcrumbList: Breadcrumb[]) {
      this.breadcrumbList = breadcrumbList;
    },
  },
});
