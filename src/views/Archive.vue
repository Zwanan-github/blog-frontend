<script setup>
import { useSettingStore } from '@/stores/setting'
import { ref } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { api } from '@/api'
import colorMap from '@/utils/color-map'
import {useRouter} from "vue-router";
import {useTitle} from "@vueuse/core";

const settingStore = useSettingStore()
const router = useRouter()

/// region 标签数据
const fetchingTagList = ref(false)
const tagList = ref([])
const tagListError = ref(null)
const getTagList = async () => {
    tagListError.value = null
    fetchingTagList.value = true
    try {
        tagList.value = await api('/tag')
    } catch (e) {
        console.error(e)
        tagListError.value = e.message
    } finally {
        fetchingTagList.value = false
    }
}
getTagList()
/// endregion 标签数据

/// region 文章列表
const fetchingArticleData = ref(false)
const articleData = ref([])
const articleDataError = ref(null)
const getArticleData = async () => {
    articleDataError.value = null
    fetchingArticleData.value = true
    try {
        articleData.value = await api('/archive')
    } catch (e) {
        console.error(e)
        articleDataError.value = e.message
    } finally {
        fetchingArticleData.value = false
    }
}
getArticleData()

useTitle(`归档 - ${settingStore.settings?.siteTitle ?? '博客'}`)


</script>

<template>
    <v-container class="border rounded-xl" style="max-width: 1000px">
        <h2 class="mt-16 mb-3">归档</h2>
        <h3 class="mt-6 mb-3 d-flex align-center">
            标签
<!--            <v-menu v-if="settingStore.isLogin" v-model="tagEditor" location="end" :close-on-content-click="false">-->
<!--                <template v-slot:activator="{ props }">-->
<!--                    <v-btn class="ml-2" v-bind="props" icon="mdi-plus" size="small" variant="text" color="primary"></v-btn>-->
<!--                </template>-->

<!--                <v-card class="ma-2 pt-2" min-width="300" elevation="2">-->
<!--                    <v-card-item>-->
<!--                        <v-text-field label="标签名" v-model="newTagName"></v-text-field>-->
<!--                    </v-card-item>-->
<!--                    <v-card-item v-show="addTagError!=null">-->
<!--                        <v-alert rounded="lg" :text="addTagError" type="error"></v-alert>-->
<!--                    </v-card-item>-->
<!--                    <v-card-actions>-->
<!--                        <v-spacer></v-spacer>-->
<!--                        <v-btn variant="text" :loading="addingTag" :disabled="newTagName.trim()===''"-->
<!--                               @click="addTag">-->
<!--                            保存-->
<!--                        </v-btn>-->
<!--                    </v-card-actions>-->
<!--                </v-card>-->
<!--            </v-menu>-->
        </h3>

        <v-progress-linear v-show="fetchingTagList" color="primary" indeterminate></v-progress-linear>
        <v-alert v-show="tagListError" rounded="lg" :text="tagListError" type="error"></v-alert>
        <div class="flex-wrap d-flex mb-2">
            <template v-for="({name},i) in tagList" :key="name">
                <v-divider v-if="i!==0&&i%20===0" class="my-4" color="info"></v-divider>
                <v-btn class="mx-1 my-2 text-none" size="small" prepend-icon="mdi-tag"
                       variant="tonal" @click:close="" :to="`/tag/${name}`" :color="colorMap(name)">
                    {{ name }}
                </v-btn>
            </template>
        </div>
        <v-progress-linear v-show="fetchingArticleData" color="primary" indeterminate></v-progress-linear>
        <v-alert v-show="articleDataError" rounded="lg" :text="articleDataError" type="error"></v-alert>
        <article-list class="border rounded-xl" :archive-date="articleData"></article-list>
    </v-container>
</template>

<style scoped>

</style>