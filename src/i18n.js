// src/i18n.js
import { createI18n } from 'vue-i18n';

// Import the Farsi translation file
import fa from './locales/fa.json';

const i18n = createI18n({
  locale: 'fa',
  fallbackLocale: 'en',
  messages: {
    fa,
  },
});

export default i18n;