<script setup>
import MainMenu from "@/components/MainMenu.vue";
import {useSettingStore} from "@/stores/setting";
import {useThemeStore} from "@/stores/theme";
import LoginDialog from "@/components/LoginDialog.vue";
import AccountInfo from "@/components/AccountInfo.vue";
import {api} from "@/api";
import {computed} from "vue";
import {useFavicon} from "@vueuse/core";
import SearchDialog from "@/components/SearchDialog.vue";

const useSetting = useSettingStore()
const useTheme = useThemeStore()

const scrollToTop = () => {
    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth'
        }
    )
}

const logout = () => {
    api(`/auth/logout`).finally(() => {
        location.reload()
    })
}

/// region 站点图标
const favicon = computed(() => useSetting.settings.favicon)
useFavicon(favicon)

</script>

<template>
    <v-app>
        <login-dialog/>
        <account-info/>
        <search-dialog/>
        <v-app-bar class="app-bar align-center" elevation="1" app fixed>
            <template #prepend>
                <v-btn @click="useSetting.openMenu = !useSetting.openMenu" class="d-flex d-sm-none"
                       icon="mdi-menu"></v-btn>
                <v-app-bar-title class="rounded mr-2 d-none d-sm-flex" v-ripple>
                    <router-link to="/" class="pa-4 text-decoration-none text-high-emphasis">
                        {{useSetting.settings.siteTitle}}
                    </router-link>
                </v-app-bar-title>
                <div class="d-none d-sm-flex">
                    <v-btn class="text-none" rounded="lg" variant="text" to="/" :active="false">主页</v-btn>
                    <v-btn class="text-none" rounded="lg" variant="text" to="/archive">归档</v-btn>
                </div>
            </template>
            <template v-slot:append>
                <v-btn icon="mdi-magnify" @click="useSetting.searchDialog = true"></v-btn>
                <v-btn :icon="useTheme.isDark?'mdi-weather-night':'mdi-weather-sunny'"
                       @click="useTheme.toggleTheme()"></v-btn>
                <a class="text-none v-btn--variant-text" :href="`mailto:${useSetting.settings?.email}`" target="_blank">
                    <v-btn icon="mdi-at"></v-btn>
                </a>
                <a class="text-none v-btn--variant-text" :href="useSetting.settings.repository"
                   target="_blank">
                    <v-btn icon="mdi-github"></v-btn>
                </a>
                <v-btn class="d-none d-sm-flex" v-if="!useSetting.isLogin" icon="mdi-login" @click="useSetting.loginDialog=true"></v-btn>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="d-none d-sm-flex" v-if="useSetting.isLogin" icon="mdi-account" @click="useSetting.loginDialog=true"></v-btn>
                    </template>
                    <v-list density="comfortable">
                        <v-list-item v-if="useSetting.isLogin" key="5" value="个人信息" color="blue" base-color="blue">
                            <v-list-item-title @click="useSetting.accountInfoDialog=true">个人信息</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="useSetting.permission.includes('ROLE_article_add')" key="6" to="/edit" value="新的文章" color="blue" base-color="blue">
                            <v-list-item-title>新的文章</v-list-item-title>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item v-if="useSetting.permission.includes('ROLE_setting_update')" key="7" to="/settings" value="网站设置" color="blue" base-color="blue">
                            <v-list-item-title>网站设置</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="useSetting.permission.includes('ROLE_setting_update')" key="8" to="/images" value="网站图床" color="blue" base-color="blue">
                            <v-list-item-title>网站图床</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="useSetting.isLogin" key="4" value="退出登录" color="red" base-color="red">
                            <v-list-item-title @click="logout">退出登录</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-layout class="rounded rounded-md">
            <div class="hidden-sm-and-up">
                <main-menu/>
            </div>
            <v-main>
                <router-view></router-view>
                <v-tooltip text="回到顶部">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="scroll-to-top text-primary"
                               icon="mdi-arrow-up" @click="scrollToTop"></v-btn>
                    </template>
                </v-tooltip>
                <footer class="text-center pt-2 pb-3 text-body-2 text-medium-emphasis"
                        v-html="useSetting.settings?.footer">

                </footer>
            </v-main>
        </v-layout>
    </v-app>
</template>

<style scoped>

</style>
