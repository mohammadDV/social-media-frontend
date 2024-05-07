import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css';
import './assets/site/fonts/vazir-ui/vazir.css';
import './assets/site/fonts/material-icons/material-icons.css';
import './assets/site/css/splide.min.css';
import './assets/site/css/styles.css';
import './assets/profile/css/custom.css';
import './assets/profile/css/styles.css';
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

// persian date picker
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

import { VueReCaptcha } from "vue-recaptcha-v3";

import GoogleSignInPlugin from "vue3-google-signin"


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


createApp(App)
    // .use(store)
    .use(VueToast)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(GoogleSignInPlugin, {
      clientId: '334836814599-trhjl192sj725fn9nbjubddejdmh5s8m.apps.googleusercontent.com',
    })
      // clientId: '334836814599-trhjl192sj725fn9nbjubddejdmh5s8m.apps.googleusercontent.com'
    .use(VueReCaptcha, {
        siteKey: '6LdDVNEpAAAAANE3aj7JoBD8ZccjvFeIW-kbzmaH',
        loaderOptions: {
          useRecaptchaNet: true
        }
    })
    .component('DatePicker', Vue3PersianDatetimePicker)
    .component('QuillEditor', QuillEditor)
    .component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')
