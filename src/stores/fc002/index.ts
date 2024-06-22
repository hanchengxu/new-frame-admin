import { defineStore } from 'pinia';
export const useFc002Store = defineStore('fc002', {
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
    },
    minus() {
      this.count--;
    },
  },
});
