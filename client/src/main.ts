import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import log from 'loglevel'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

// Import translations
import en from './locales/en.json'
import et from './locales/et.json'

// Configure loglevel
if (process.env.NODE_ENV === 'production') {
  log.setLevel('error') // Only show errors in production
} else {
  log.setLevel('debug') // Show all logs in development
}

// Create I18n instance with the translations
const i18n = createI18n({
  legacy: false, // disables legacy API mode
  locale: 'en',
  messages: {
    en,
    et,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCalendar)
app.use(i18n)

app.mount('#app')

export default i18n;
