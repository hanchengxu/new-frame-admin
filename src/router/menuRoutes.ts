import TargetList from '../views/fc001/TargetList.vue';
import TargetEdit from '../views/fc001/TargetEdit.vue';
import QRCode from '@/views/fc002/QRCode.vue';
import { RouteRecordRaw } from 'vue-router';

//ログイン後のルーター定義
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'fc001',
    name: 'targetList',
    component: TargetList,
    meta: {
      leaveDistoryStores: ['fc001'],
      title: 'リスト検索',
    },
  },
  {
    path: 'fc001/edit/:id',
    name: 'targetEdit',
    component: TargetEdit,
    meta: {
      leaveDistoryStores: ['fc001'],
      title: '変更',
    },
  },
  {
    path: 'fc001/preview/:id',
    name: 'targetPreview',
    component: TargetEdit,
    meta: {
      title: 'Preivew',
    },
  },
  {
    path: 'qrcode',
    name: 'qrcode',
    component: QRCode,
    meta: {
      title: 'QRコード管理',
    },
  },
];
