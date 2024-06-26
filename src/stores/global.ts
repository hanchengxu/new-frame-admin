import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { Router, useRouter } from 'vue-router';

export interface GlobalState {
  processing: boolean;
  loginToken: string;
  router: Router;
}

export const useGlobalState = defineStore('global', {
  state: () => {
    const router = useRouter();
    return {
      processing: false,
      loginToken: '',
      router: markRaw(router),
    };
  },

  getters: {
    getProcessing: (state) => state.processing,
    getLoginToken: (state) => state.loginToken,
  },

  actions: {
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
