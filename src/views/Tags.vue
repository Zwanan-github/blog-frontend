<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {useSettingStore} from '@/stores/setting'
import { useTitle } from '@vueuse/core'
import { api } from '@/api'
import colorMap from '@/utils/color-map'
import ArticleCardList from "@/components/ArticleCardList.vue";

const router = useRouter()
const settingStore = useSettingStore()

const tag = computed(() => router.currentRoute.value?.params['tag'] ?? '')

/// region 获取 tag 完整信息
/// endregion 获取 tag 完整信息

/// region 获取 tag 下的文章列表
const page = ref(1)
const articleData = ref({})
const isFetchingArticle = ref(false)
const fetchArticleError = ref(null)
const fetchArticle = async () => {
    fetchArticleError.value = null
    isFetchingArticle.value = true
    try {
        articleData.value = await api(`/article/tag?tagName=${tag.value}&page=${page.value - 1}&size=${settingStore.settings?.pageSize ?? 12}`)
    } catch (e) {
        console.error(e)
        fetchArticleError.value = e.message
    } finally {
        isFetchingArticle.value = false
    }
}
fetchArticle()
/// endregion 获取 tag 下的文章列表

/// region 编辑 tag
/// endregion 编辑 tag

/// region 删除 tag
/// endregion 删除 tag

/// region 切换 tag 时的监听
watch(page, fetchArticle)
/// endregion 切换 tag 时的监听

const title = computed(() => `${tag.value ?? '标签'} - ${settingStore.settings?.siteTitle ?? '博客'}`)
useTitle(title)

</script>

<template>
    <v-container class="my-16">
        <h2 class="my-6 d-flex align-center">
            <v-chip size="x-large" :color="colorMap(tag)">{{ tag }}</v-chip>
        </h2>
        <v-progress-linear v-show="isFetchingArticle" color="primary" indeterminate></v-progress-linear>
        <v-alert v-show="fetchArticleError" rounded="lg" :text="fetchArticleError" type="error"></v-alert>
        <article-card-list :article-data="articleData" cols="12" md-cols="6" :page="page" @on-page="(p)=>page=p"></article-card-list>
    </v-container>
</template>

<style scoped>
</style>
