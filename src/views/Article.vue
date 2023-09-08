<script setup>

import {useSettingStore} from "@/stores/setting";
import {computed, ref} from "vue";
import {api} from "@/api";
import {useDateFormat} from "@vueuse/core/index";
import ArticleReader from "@/components/ArticleReader.vue";
import {useRouter} from "vue-router";
import {useTitle} from "@vueuse/core";
import colorMap from "@/utils/color-map";

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

/// 处理网页标题
const title = computed(() => `${articleData.value?.title ?? '文章'} - ${useSetting.settings?.siteTitle ?? '博客'}`)
useTitle(title)

</script>

<template>
    <div>
<!--        <div v-if="settingStore.isLogin && isEdit">-->
<!--            <v-container>-->
<!--                <v-btn @click="isEdit=false" variant="text">-->
<!--                    <template #prepend>-->
<!--                        <v-icon class="mt-1">mdi-chevron-left</v-icon>-->
<!--                    </template>-->
<!--                    取消-->
<!--                </v-btn>-->
<!--            </v-container>-->
<!--            <article-editor :article-data="editData" @submit="onSaveArticle"></article-editor>-->
<!--        </div>-->
        <v-container style="max-width: 900px;">
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
<!--                        <v-menu v-if="settingStore.isLogin">-->
<!--                            <template v-slot:activator="{ props }">-->
<!--                                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>-->
<!--                            </template>-->
<!--                            <v-list elevation="2" density="compact">-->
<!--                                <v-list-item @click="openEdit" title="编辑"></v-list-item>-->
<!--                                <v-dialog v-model="deleteDialog" width="auto">-->
<!--                                    <template v-slot:activator="{ props }">-->
<!--                                        <v-list-item v-bind="props" title="删除"></v-list-item>-->
<!--                                    </template>-->
<!--                                    <v-card>-->
<!--                                        <v-card-text>-->
<!--                                            确认删除此文章 "{{ articleData.title }}" ?-->
<!--                                        </v-card-text>-->
<!--                                        <v-card-item v-show="deleteError">-->
<!--                                            <v-alert rounded="lg" :text="deleteError" type="error"></v-alert>-->
<!--                                        </v-card-item>-->
<!--                                        <v-card-actions>-->
<!--                                            <v-btn color="red-lighten-2" block @click="deleteArticle" :loading="deleting">确认删除</v-btn>-->
<!--                                        </v-card-actions>-->
<!--                                    </v-card>-->
<!--                                </v-dialog>-->
<!--                            </v-list>-->
<!--                        </v-menu>-->
                    </v-card-actions>
                </v-card>
            </v-container>
            <v-progress-linear v-show="fetchingArticleData" class="mt-4" color="primary" indeterminate></v-progress-linear>
            <v-alert v-show="articleDataError" rounded="lg" :text="articleDataError" type="error"></v-alert>
            <article-reader v-show="path!==''" :data="articleData"></article-reader>
        </v-container>
    </div>
</template>

<style scoped>

</style>