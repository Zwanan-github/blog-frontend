<script setup>

import {ref} from "vue";
import {api} from "@/api";
import ArticleCard from "@/components/ArticleCard.vue";
import {useSettingStore} from "@/stores/setting";
import {useThemeStore} from "@/stores/theme";
import {useTitle} from "@vueuse/core";

const useSetting = useSettingStore()

const fetchingArticleData = ref(false)
const articleDataError = ref(null)
const articleData = ref(null)

const getArticle = async () => {
    articleDataError.value = null
    fetchingArticleData.value = true
    try {
        articleData.value = await api('/article?&sort=updateDate,desc&size=9')
    } catch (e) {
        console.error(e)
        articleDataError.value = e.message
    } finally {
        fetchingArticleData.value = false
    }
}
getArticle()

useTitle(`主页 - ${ useSetting.settings?.siteTitle ?? '博客' }`)


</script>

<template>
    <v-container>
        <div class="position-relative mt-16" style="height: 200px;" v-show="useSetting.inMobile == false">
            <v-img class="w-100 mt-0 rounded-xl" style="height: 220px"
                   cover
                   :src="useSetting.settings?.banner"/>
            <div class="site-info">
                <v-avatar :image="useSetting.settings?.avatar" size="80"></v-avatar>
                <div class="ml-4">
                    <h2 class="text-high-emphasis">Zwanan'Blog</h2>
                    <p class="text-body-2 text-medium-emphasis">天天开心</p>
                    <a href="#"
                       class=" text-body-2 text-decoration-none text-medium-emphasis">
                        Zwanan
                    </a>
                </div>
            </div>
        </div>
        <h3 class="mb-3 mt-16">最近更新</h3>
        <v-progress-linear v-show="fetchingArticleData" color="primary" indeterminate></v-progress-linear>
        <v-alert v-show="articleDataError" rounded="lg" :text="articleDataError" type="error"></v-alert>
        <v-row>
            <v-col v-for="a in articleData?.content ?? []" :key="a.id" cols="12" xl="3" md="4" sm="6">
                <article-card :article="a"/>
            </v-col>
            <v-col cols="12" class="mt-2 text-center">
                <v-btn to="/archive" color="primary">前往归档查看更多</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>