import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
// mdi
import '@mdi/font/css/materialdesignicons.css'
import {zhHans} from "vuetify/locale";

// markdown
import 'md-editor-v3/lib/style.css'
import '@/main.css'

const vuetify = createVuetify({
    locale: {
        locale: 'zhHans',
        messages: {zhHans},
    },
    defaults: {
        VBtn: {
            rounded: true,
        },
        VCard: {
            rounded: 'xl',
            elevation: 0,
        },
        VTextField: {
            variant: 'underlined',
        },
    },
    theme: {
        themes: {
            light: {
                colors: {
                    primary: colors.green.lighten1,
                },
            },
        },
    },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
