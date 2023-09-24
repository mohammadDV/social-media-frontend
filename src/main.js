import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import Store from './store'
import './assets/index.css';
import router from './router';

const store = createStore(Store);

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
