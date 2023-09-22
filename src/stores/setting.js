import {defineStore} from "pinia";
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {api} from "@/api";

export const useSettingStore = defineStore('setting', () => {
    const openMenu = ref(false)
    const {xs} = useDisplay()
    const inMobile = ref(xs.value)

    const settings = ref({
        banner: '/banner.webp',
        avatar: '/avatar.webp',
        favicon: '/avatar.webp',
        footer: 'Copyright@Zwanan',
        siteTitle: 'Zwanan\'s Blog',
        info: '天天开心',
        email: '270603801@qq.com',
        repository: 'https://github.com/Zwanan-github',
        pageSize: '6'
    })

    api('/settings').then((data)=> {
        settings.value = {
            banner: data?.banner ?? '/banner.webp',
            avatar: data?.avatar ??'/avatar.webp',
            favicon: data?.favicon ?? '/avatar.webp',
            footer: data?.footer ?? 'Copyright@Zwanan',
            siteTitle: data?.siteTitle ?? 'Zwanan\'s Blog',
            info: data?.info ?? '天天开心',
            email: data?.email ?? '270603801@qq.com',
            repository: data?.repository ?? 'https://github.com/Zwanan-github',
            pageSize: data?.pageSize ?? '6'
        }
    })

    const isLogin = ref(false)
    api(`/auth`).then((data) => isLogin.value = data)
    const loginDialog = ref(false)
    const searchDialog = ref(false)
    const accountInfoDialog = ref(false)
    const permission = ref([])
    api('/auth/permission').then((data) => permission.value = data)
    return {openMenu, inMobile, settings, isLogin, loginDialog, searchDialog, accountInfoDialog, permission}
})