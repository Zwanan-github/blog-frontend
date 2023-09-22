import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

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

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker 注册成功'))
        .catch((error) => console.log('Service Worker 注册失败:', error))
} else {
    console.warn('当前浏览器不支持 Service Worker')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
