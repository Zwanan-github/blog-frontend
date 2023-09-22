<script setup>

import {useSettingStore} from "@/stores/setting";
import {api} from "@/api";

const useSetting = useSettingStore()

const logout = () => {
    api(`/auth/logout`).finally(() => {
        location.reload()
    })
}
</script>

<template>
    <v-navigation-drawer :width="useSetting.inMobile?'250':0" class="d-flex d-md-none position-fixed catalog mt-16" border="none"
                         location="left"
                         v-model="useSetting.openMenu">
        <v-list>
            <v-list-item
                :prepend-avatar="useSetting.settings?.avatar"
                title="Zwanan'Blog"
                subtitle="天天开心"
            ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            :lines="false"
            density="compact"
            color="primary"
            nav
        >
            <v-list-item key="1" value="主页" color="red" to="/">
                <v-list-item-title>主页</v-list-item-title>
            </v-list-item>
            <v-list-item key="2" value="归档" color="red" to="/archive">
                <v-list-item-title>归档</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-divider/>
        <v-list :lines="false"
                density="compact"
                color="primary"
                nav>
            <v-list-item v-if="!useSetting.isLogin" key="3" value="登录" color="blue" base-color="blue">
                <v-list-item-title @click="useSetting.loginDialog=true">登录</v-list-item-title>
            </v-list-item>
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
    </v-navigation-drawer>
</template>

<style scoped>

</style>