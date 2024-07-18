import router from '@/router';
import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { Router } from 'vue-router';

import { App } from 'ant-design-vue';
import type { MessageInstance } from 'ant-design-vue/es/message/interface';

export interface GlobalState {
  processing: boolean;
  loginToken: string;
  router: Router; // システムルーター
  previousRouterName: string;
  message: MessageInstance; //グローバル メッセージ
}

export const useGlobalState = defineStore('global', {
  state: () => {
    const staticFunction = App.useApp();
    const message: MessageInstance = staticFunction.message;
    return {
      processing: false,
      loginToken: '',
      router: markRaw(router),
      previousRouterName: '',
      message: markRaw(message),
    };
  },

  getters: {
    getProcessing: (state) => state.processing,
    getLoginToken: (state) => state.loginToken,
  },

  actions: {
    setPreviousRouterName(previousRouterName: string) {
      this.previousRouterName = previousRouterName;
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
  },
});
