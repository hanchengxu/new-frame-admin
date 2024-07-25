import { getTagList } from '@/api/common/getTagList';
import { postTargetList } from '@/api/target/postTargetList';
import { PostTargetRequest, TagetListDto } from '@/api/target/types';
import { DefaultOptionType } from 'ant-design-vue/es/select';
import { defineStore } from 'pinia';

export interface FC001State {
  searchParams: PostTargetRequest; //form
  tagList: DefaultOptionType[]; // 選択肢
  result: TagetListDto[]; //検索結果
  total: number; //検索結果総件数
}

const initDate: FC001State = {
  searchParams: {
    name: '',
    age: '',
    gender: '',
    address: '',
    tags: [],
    limit: '10',
    offset: '0',
  },
  tagList: [],
  result: [],
  total: 0,
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
    getSearchParams: (state) => {
      return state.searchParams;
    },
    getResult: (state) => state.result,
    getPagination: (state) => {
      // TODO設定項目の共通化
      return {
        current: Number(state.searchParams.offset) / Number(state.searchParams.limit) + 1,
        pageSize: Number(state.searchParams.limit),
        total: state.total,
        showSizeChanger: true,
      };
    },
  },

  actions: {
    async search() {
      const list = await postTargetList(this.getSearchParams);
      this.$patch((state) => {
        state.result = list.details;
        state.total = list.total;
      });
    },
    async edit() {},
    async delete() {},
    async add() {},

    async getTags() {
      const tagList = await getTagList();
      this.$patch((state) => {
        state.tagList = tagList.details;
      });
    },

    setPagination(current: number, pageSize: number) {
      this.$patch((state) => {
        if (pageSize.toString() !== state.searchParams.limit) {
          // page単位変更すれば、1ページ目に戻る
          state.searchParams.limit = pageSize.toString();
          state.searchParams.offset = '0';
        } else {
          state.searchParams.offset = ((current - 1) * pageSize).toString();
        }
      });
      // ページングなら、再検索する
      this.search();
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
