import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import pinia from '@/stores/pinia';
import './assets/css/main.css';

const app = createApp(App);

// app.config.errorHandler = (err, instance, info) => {
//   console.error("global error handler:",info);
// }

app.use(router);
app.use(pinia);
app.mount('#app');
