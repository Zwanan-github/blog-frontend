<script setup>

import {useSettingStore} from "@/stores/setting";
import {computed, ref} from "vue";
import {api} from "@/api";
import {useDateFormat} from "@vueuse/core/index";
import ArticleReader from "@/components/ArticleReader.vue";
import {useRouter} from "vue-router";
import {useTitle} from "@vueuse/core";
import colorMap from "@/utils/color-map";
import ArticleEditor from "@/components/ArticleEditor.vue";
import CommentPage from "@/components/CommentPage.vue";

const useSetting = useSettingStore()
const router = useRouter()

// 文章路径
const path = computed(() => router.currentRoute.value?.params['path'] ?? '')

// region 文章数据
const fetchingArticleData = ref(false)
const articleData = ref(null)
const articleDataError = ref(null)
// 格式化时间
const createDate = computed(() => articleData.value?.createDate)
const formattedCreateDate = useDateFormat(createDate, 'YYYY-MM-DD HH:mm:ss')
const updateDate = computed(() => articleData.value?.updateDate)
const formattedUpdateDate = useDateFormat(updateDate, 'YYYY-MM-DD HH:mm:ss')
const getArticleData = async () => {
    articleDataError.value = null
    fetchingArticleData.value = true
    try {
        articleData.value = await api(`/article/${path.value}`)
    } catch (e) {
        console.error(e)
        articleDataError.value = e.message
    } finally {
        fetchingArticleData.value = false
    }
}
getArticleData()

const deleteDialog = ref(false)
const deleting = ref(false)
const deleteError = ref(null)
const deleteArticle = async () => {
    deleting.value = true
    deleteError.value = null
    try {
        await api(`/article/${path.value}`, 'DELETE')
        await router.replace('/archive')
    } catch (e) {
        console.error(e)
        deleteError.value = e.message
    } finally {
        deleting.value = false
    }
}

/// region 文章编辑
const editData = ref({})
const isEdit = ref(false)
const openEdit = () => {
    // 打开编辑器前处理标签
    editData.value = {...articleData.value, tagNames: articleData.value.tags?.map((tag) => tag.name) ?? []}
    isEdit.value = true
}
// 保存文章后的回调
const onSaveArticle = (newPath) => {
    const lastPath = path.value
    // 如果没有修改路径，直接刷新
    if (lastPath === newPath) return router.go(0)
    // 修改了路径就跳转过去
    return router.replace(`/${newPath}`)
}
/// endregion 文章编辑

/// 处理网页标题
const title = computed(() => `${articleData.value?.title ?? '文章'} - ${useSetting.settings?.siteTitle ?? '博客'}`)
useTitle(title)

</script>

<template>
    <div>
        <v-container v-if="useSetting.isLogin && isEdit">
            <v-container>
                <v-btn @click="isEdit=false" variant="text">
                    <template #prepend>
                        <v-icon class="mt-1">mdi-chevron-left</v-icon>
                    </template>
                    取消
                </v-btn>
            </v-container>
            <article-editor :article-data="editData" @submit="onSaveArticle"></article-editor>
        </v-container>
        <v-container v-if="!isEdit" style="max-width: 900px;">
            <v-container>
                <v-card class="mt-16" border>
                    <v-img class="text-white align-end"
                           :src="articleData?.cover" cover gradient="to top, rgba(0,0,0,0.5), rgba(0,0,0,0.1)" height="200px">
                        <template v-slot:error>
                            <v-img height="100%" width="100%" cover :src="useSetting.settings?.banner"
                                   gradient="to top, rgba(0,0,0,0.5), rgba(0,0,0,0.1)"></v-img>
                        </template>
                        <v-card-title>{{ articleData?.name }}</v-card-title>
                    </v-img>
                    <div class="mt-4 mx-2 d-flex flex-wrap">
                        <v-chip class="ml-2" v-for="tag in articleData?.tags || []"
                                :to="`/tag/${tag.name}`" :color="colorMap(tag.name)">
                            {{ tag.name }}
                        </v-chip>
                    </div>
                    <v-card-actions v-show="articleData?.name" class="d-flex flex-wrap">
                        <p class="mx-2">创建时间: {{ formattedCreateDate }}</p>
                        <p class="mx-2">修改时间: {{ formattedUpdateDate }}</p>
                        <v-spacer></v-spacer>
                        <v-menu v-if="useSetting.isLogin">
                            <template v-slot:activator="{ props }">
                                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                            </template>
                            <v-list elevation="2" density="compact">
                                <v-list-item @click="openEdit" title="编辑"></v-list-item>
                                <v-dialog v-model="deleteDialog" width="auto">
                                    <template v-slot:activator="{ props }">
                                        <v-list-item v-bind="props" title="删除"></v-list-item>
                                    </template>
                                    <v-card>
                                        <v-card-text>
                                            确认删除此文章 "{{ articleData.name }}" ?
                                        </v-card-text>
                                        <v-card-item v-show="deleteError">
                                            <v-alert rounded="lg" :text="deleteError" type="error"></v-alert>
                                        </v-card-item>
                                        <v-card-actions>
                                            <v-btn color="red-lighten-2" block @click="deleteArticle" :loading="deleting">确认删除</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-list>
                        </v-menu>
                    </v-card-actions>
                </v-card>
            </v-container>
            <v-progress-linear v-show="fetchingArticleData" class="mt-4" color="primary" indeterminate></v-progress-linear>
            <v-alert v-show="articleDataError" rounded="lg" :text="articleDataError" type="error"></v-alert>
            <article-reader v-show="path!==''" :data="articleData"></article-reader>
            <v-container class="mt-4 mb-3">
                <span style="font-size: 24px">评论</span>
                <comment-page></comment-page>
            </v-container>
        </v-container>
    </div>
</template>

<style scoped>

</style>