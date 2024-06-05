import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import router from './router'
// Translations provided by Vuetify
// Your own translation file
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// const messages = {
//   en: {
//     $vuetify: {
//       ...en,
//       dataIterator: {
//         rowsPerPageText: 'Items per page:',
//         pageText: '{0}-{1} of {2}'
//       }
//     }
//   },
//   vi: {
//     $vuetify: {
//       ...vi,
//       ...myVi
//     }
//   }
// }

// const i18n = createI18n({
//   legacy: false, // Vuetify does not support the legacy mode of vue-i18n
//   locale: 'vi',
//   fallbackLocale: 'en',
//   messages
// })

const vuetify = createVuetify({
  components,
  directives,
  // locale: {
  //   adapter: createVueI18nAdapter({ i18n, useI18n })
  // },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  defaults: {
    VProgressCircular: {
      color: 'primary',
      size: 20,
      indeterminate: true
    },
    VSheet: {
      elevation: 3,
      rounded: 'lg'
    }
  }
})
// app.use(i18n)
app.use(vuetify)

app.use(VueQueryPlugin, { enableDevtoolsV6Plugin: true })
app.mount('#app')
