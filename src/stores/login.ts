import { STATUS_SUCCESS } from '@/api/BaseType';
import { getTest } from '@/api/login/getTest';
import { postLogin } from '@/api/login/postLogin';
import { PostLoginResponseResult } from '@/api/login/types';
import { defineStore } from 'pinia';
import { isEqual } from 'radash';
import { useGlobalState } from './global';

export interface LoginState {
  username: string;
  password: string;
  remember: boolean;
}

const initLoginState = (): LoginState => {
  return {
    username: '',
    password: '',
    remember: true,
  };
};

export const useLoginStore = defineStore('login', {
  state: () => {
    return initLoginState();
  },

  getters: {
    getLoginForm: (state): LoginState => state,
  },

  actions: {
    async login() {
      postLogin({ username: this.username, password: this.password }).then((content: PostLoginResponseResult) => {
        if (isEqual(content.status, STATUS_SUCCESS)) {
          useGlobalState().setToken(content.details.token ?? '');
          useGlobalState().router.push('/top/targetList');
        }
      });
    },

    async test() {
      const result = await getTest();
      console.log(result);
    },
  },
  persist: false,
});
