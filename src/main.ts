import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import { Toast } from 'vant';
import 'vant/lib/index.css'; // 全局引入样式


createApp(App).use(Toast).use(store).use(router).mount('#app');
