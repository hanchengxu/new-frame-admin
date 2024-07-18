import { postTargetList } from '@/api/target/postTargetList';
import { PostTargetRequest, TagetListDto } from '@/api/target/types';
import { DefaultOptionType } from 'ant-design-vue/es/select';
import { defineStore } from 'pinia';

export interface SearchParams extends PostTargetRequest {
  tagList: DefaultOptionType[];
}

export interface FC001State {
  searchParams: SearchParams;
  result: TagetListDto[];
}

const initDate: FC001State = {
  searchParams: {
    name: '',
    age: '',
    gender: '',
    address: '',
    tags: [],
    tagList: [
      { value: 1, label: 'tag1' },
      { value: 2, label: 'tag2' },
      { value: 3, label: 'tag3' },
      { value: 4, label: 'tag4' },
      { value: 5, label: 'tag5' },
      { value: 6, label: 'tag6' },
    ],
  },
  result: [],
};

// 初期化store,必須メソッド
const initState = (): FC001State => {
  return structuredClone(initDate);
};

export const useFc001Store = defineStore('fc001', {
  state: (): FC001State => {
    return initState();
  },

  getters: {
    getSearchParams: (state) => state.searchParams,
    getResult: (state) => state.result,
    // api request body
    getRequestParams: (state): PostTargetRequest => {
      return {
        name: state.searchParams.name,
        age: state.searchParams.age,
        gender: state.searchParams.gender,
        address: state.searchParams.address,
        tags: state.searchParams.tags,
      };
    },
  },

  actions: {
    async search() {
      const list = await postTargetList(this.getRequestParams);
      this.$state.result = list.details;
    },
    async edit() {},
    async delete() {},
    async add() {},
    resetSearch() {
      this.$patch((state) => {
        state.searchParams = initState().searchParams;
      });
    },
    getInitData() {
      return initState();
    },
  },
});
