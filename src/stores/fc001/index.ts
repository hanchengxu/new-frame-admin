import { getTagList } from '@/api/common/getTagList';
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
    tagList: [],
  },
  result: [],
};

// 初期化store,必須
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

    async getTags() {
      const tagList = await getTagList();
      this.$state.searchParams.tagList = tagList.details;
    },

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
