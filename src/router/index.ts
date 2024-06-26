import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import A from '@/views/fc001/A.vue';
import B from '@/views/fc002/B.vue';
import Login from '@/views/Login.vue';
import Top from '@/views/Top.vue';
import { useGlobalState } from '@/stores/global';
import { isEmpty } from 'radash';

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
        return '/';
      } else {
        return true;
      }
    },
  },
  {
    path: '/A',
    name: 'A',
    component: A,
  },
  {
    path: '/B',
    name: 'B',
    component: B,
  },
];

const router = createRouter({
  history: createWebHistory('/newframe'),
  routes,
});

router.beforeEach((to, _from, next) => {
  console.log('Navigating to:', to.path);
  next();
});

export const goToOtherPage = (path: string) => {
  router.push(path);
};

export default router;
