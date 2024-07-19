import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Top from '@/views/Top.vue';
import { useGlobalStore } from '@/stores/global';
import { isEmpty } from 'radash';
import TargetList from '../views/fc001/TargetList.vue';
import TargetEdit from '../views/fc001/TargetEdit.vue';
import NotFoundComponent from '../views/NotFoundComponent.vue';
import QRCode from '@/views/fc002/QRCode.vue';
import { storeMap } from '@/stores/pinia';
import { toRaw } from 'vue';
import { menuRoutes } from './menuRoutes';

declare module 'vue-router' {
  interface RouteMeta {
    leaveDistoryStores?: string[]; // 他の画面へ遷移する時、リセット必要なstore
    noAuth?: boolean; // 認証せずにアクセスできる
    title?: string; //画面表示のページ名
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      noAuth: true,
    },
    beforeEnter: () => {
      if (isEmpty(useGlobalStore().loginToken)) {
        return true;
      } else {
        return '/';
      }
    },
  },
  {
    path: '/',
    name: 'top',
    component: Top,
    redirect: { name: 'targetList' }, //login後初期表示画面
    children: menuRoutes,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFoundComponent.vue'),
    meta: {
      noAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory('/newframe'),
  routes,
});

router.beforeEach((to, _from) => {
  if (to.meta.noAuth) {
    return true;
  } else {
    //TODO login認証ロジック
    if (isEmpty(useGlobalStore().loginToken)) {
      return { name: 'Login' };
    } else {
      return true;
    }
  }
});

router.afterEach((to, from) => {
  //子階層からの遷移
  if (useGlobalStore().breadcrumbList.length > 1) {
    if (!from.path.includes(to.path)) {
      //親画面に遷移するリセットしない
      //他のTop階層に遷移するとストアをリセットする
      clearStore(from);
    }
  } else {
    //Top階層間の遷移: leaveDistoryStoresよりストアをリセットする
    if (!to.path.includes(from.path) && from.meta.leaveDistoryStores) {
      clearStore(from);
    }
  }

  if (menuRoutes.some((menuRoute) => menuRoute.name === to.name)) {
    const toPathList = to.path.split('/').filter((subPath) => subPath);
    //top階層へ
    if (toPathList.length === 1 && toPathList[0] === to.path.replace('/', '')) {
      //1. breadcrumbListを上書き
      useGlobalStore().setBreadcrumbList([{ breadcrumbName: to.meta.title ?? '', routeName: to.name ?? '' }]);
    } else {
      //親子階層:breadcrumbListにroute情報を追加する
      toPathList.forEach((path) => {
        const target = menuRoutes.find((menuRoute) => menuRoute.path === path);
        if (target && !useGlobalStore().hasBreadcrumb(target.name ?? '')) {
          useGlobalStore().pushBreadcrumb(target.meta?.title ?? '', target.name ?? '');
        }
      });
      if (!useGlobalStore().hasBreadcrumb(to.name ?? '')) {
        useGlobalStore().pushBreadcrumb(to.meta.title ?? '', to.name ?? '');
      }
    }
  }
});

function clearStore(from: RouteLocationNormalized) {
  if (from?.meta?.leaveDistoryStores) {
    from?.meta?.leaveDistoryStores.forEach((storeName: string) => {
      const store = toRaw(storeMap.get(storeName));
      if (store) {
        store.$reset();
      }
    });
  }
}

export const goToOtherPage = (path: string) => {
  router.push(path);
};

export default router;
