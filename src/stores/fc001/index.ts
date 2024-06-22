import { defineStore } from 'pinia';

export const useFc001Store = defineStore('fc001', {
  state: () => {
    return {
      count: 0 as number,
    };
  },

  getters: {
    getCount: (state) => state.count,
  },

  actions: {
    increment() {
      this.count++;
      // throw new Error('test error');
    },

    testAction(args: string[]) {
      console.log(args);
    },

    minus() {
      this.count--;
    },
  },
});
