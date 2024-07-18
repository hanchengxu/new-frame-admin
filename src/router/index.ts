import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Top from '@/views/Top.vue';
import { useGlobalState } from '@/stores/global';
import { isEmpty } from 'radash';
import TargetList from '../views/fc001/TargetList.vue';
import TargetEdit from '../views/fc001/TargetEdit.vue';
import QRCode from '@/views/fc002/QRCode.vue';
import { storeMap } from '@/stores/pinia';
import { toRaw } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    // 使うstore名のリスト
    stores?: string[];
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/top',
    name: 'top',
    component: Top,
    beforeEnter() {
      if (isEmpty(useGlobalState().loginToken)) {
        return true;
      } else {
        return true;
      }
    },
    children: [
      {
        path: 'targetList',
        name: 'リスト検索',
        component: TargetList,
        meta: {
          stores: ['fc001'],
        },
      },
      {
        path: 'targetEdit',
        name: '変更',
        component: TargetEdit,
      },
      {
        path: 'qrcode',
        name: 'QRコード管理',
        component: QRCode,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/newframe'),
  routes,
});

router.beforeEach((_to, from) => {
  useGlobalState().setPreviousRouterName((from.name as string) ?? '');
  return true;
});

router.afterEach((_to, from) => {
  if (from.meta.stores) {
    from.meta.stores.forEach((storeName: string) => {
      const store = toRaw(storeMap.get(storeName));
      if (store && Object.prototype.hasOwnProperty.call(store, 'getInitData')) {
        store.resetAll(store.getInitData());
      }
    });
  }
});

export const goToOtherPage = (path: string) => {
  router.push(path);
};

export default router;
