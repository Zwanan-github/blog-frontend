<script setup>

import {useSettingStore} from "@/stores/setting";
import {reactive, ref} from "vue";
import {api} from "@/api";

const useSetting = useSettingStore()
// region 登录

const form = reactive({
    username: '',
    password: '',
    remember: false,
})
const usernameRule = (value) => {
    if (value?.trim() !== '') return true
    return '用户名不能为空'
}
const passwordRule = (value) => {
    if (value?.trim() !== '') return true
    return '密码不能为空'
}
const isDoLogin = ref(false)
const loginError = ref(null)
const login = async () => {
    loginError.value = null
    isDoLogin.value = true
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('password', form.password)
    formData.append('remember-me', `${form.remember}`)
    try {
        await api(`/auth/login`, 'POST', formData, false)
        useSetting.isLogin = true
        useSetting.loginDialog = false
        api('/auth/permission').then((data) => useSetting.permission = data)
    } catch (e) {
        console.error(e)
        loginError.value = e.message
    } finally {
        isDoLogin.value = false
    }
}

</script>

<template>
    <v-dialog v-if="!useSetting.isLogin" v-model="useSetting.loginDialog" max-width="500px">
        <v-card>
            <v-toolbar v-show="useSetting.isLogin!==true" color="transparent">
                <v-btn icon dark @click="useSetting.loginDialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>登录</v-toolbar-title>
            </v-toolbar>
            <v-card-item v-if="loginError!=null">
                <v-alert rounded="lg" :text="loginError" type="error"></v-alert>
            </v-card-item>
            <v-card-item class="mb-8">
                <v-form class="pa-4" validate-on="submit lazy" @submit.prevent="login">
                    <v-text-field :rules="[usernameRule]" v-model="form.username" label="用户名"></v-text-field>
                    <v-text-field :rules="[passwordRule]" v-model="form.password" type="password" label="密码"></v-text-field>
                    <v-checkbox v-model="form.remember" label="在此设备上记住我"></v-checkbox>
                    <v-btn color="primary" :loading="isDoLogin" type="submit" block class="mt-2" text="登录"></v-btn>
                </v-form>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>