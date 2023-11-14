import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css';
import router from './router';

// Data table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// Toast
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Locales
import i18n from './i18n';

//  Store
import {createPinia} from "pinia";
import {createPersistedState} from 'pinia-plugin-persistedstate';

// editor
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const pinia = createPinia();
pinia.use(createPersistedState({
    storage: localStorage,
    auto: true,
}));

const globalOptions = {
    readOnly: false,
    theme: 'snow'
  }
  QuillEditor.props.globalOptions.default = () => globalOptions


// import { createStore } from 'vuex'
// import Store from './store'
// const store = createStore(Store);

createApp(App)
    // .use(store)
    .use(VueToast)
    .use(i18n)
    .use(pinia)
    .use(pinia)
    .use(router)
    .component('QuillEditor', QuillEditor)
    .component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')
