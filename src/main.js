import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import the Vuex store
import router from './router';

import './assets/css/global.css'; // Import the global CSS file

const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(router);

app.mount('#app');
