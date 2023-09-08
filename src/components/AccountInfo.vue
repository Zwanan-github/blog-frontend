<script setup>

import {useSettingStore} from "@/stores/setting";

const useSetting = useSettingStore()

</script>

<template>
    <v-dialog v-model="useSetting.accountInfoDialog" max-width="500px">
        <v-card>
            <v-toolbar v-show="useSetting.accountInfoDialog===true" color="transparent">
                <v-btn icon dark @click="useSetting.accountInfoDialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>个人信息</v-toolbar-title>
            </v-toolbar>
<!--            <v-card-item v-if="loginError!=null">-->
<!--                <v-alert rounded="lg" :text="loginError" type="error"></v-alert>-->
<!--            </v-card-item>-->
<!--            <v-card-item class="mb-8">-->
<!--                <v-form class="pa-4" validate-on="submit lazy" @submit.prevent="login">-->
<!--                    <v-text-field :rules="[usernameRule]" v-model="form.username" label="用户名"></v-text-field>-->
<!--                    <v-text-field :rules="[passwordRule]" v-model="form.password" type="password" label="密码"></v-text-field>-->
<!--                    <v-checkbox v-model="form.remember" label="在此设备上记住我"></v-checkbox>-->
<!--                    <v-btn color="primary" :loading="isDoLogin" type="submit" block class="mt-2" text="登录"></v-btn>-->
<!--                </v-form>-->
<!--            </v-card-item>-->
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>