import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css';
import router from './router';

// Toast
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Locales
import i18n from './i18n';

//  Store
import {createPinia} from "pinia";
import {createPersistedState} from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(createPersistedState({
    storage: localStorage,
    auto: true,
}));


// import { createStore } from 'vuex'
// import Store from './store'
// const store = createStore(Store);

createApp(App)
    // .use(store)
    .use(VueToast)
    .use(i18n)
    .use(pinia)
    .use(router)
    .mount('#app')