import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// Translations provided by Vuetify
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { en, vi } from 'vuetify/locale'
// Your own translation file
import myVi from './i18n/vuetify/vi/'
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)

const messages = {
  en: {
    $vuetify: {
      ...en,
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}'
      }
    }
  },
  vi: {
    $vuetify: {
      ...vi,
      ...myVi
    }
  }
}

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'vi',
  fallbackLocale: 'en',
  messages
})

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
app.use(i18n)
app.use(vuetify)

app.mount('#app')
