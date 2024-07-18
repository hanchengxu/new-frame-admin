import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import pinia from '@/stores/pinia';
import './assets/css/main.css';
import { message } from 'ant-design-vue';
import { MessageApi } from 'ant-design-vue/es/message';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

declare global {
  interface Window {
    $message: MessageApi;
  }
}
window.$message = message;

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.error('global error handler:', err, instance, info);
};

app.use(router);
app.use(pinia);
app.mount('#app');
