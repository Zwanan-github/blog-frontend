<script setup>
import { ref, watch} from "vue";
import {api} from "@/api";
import {useSettingStore} from "@/stores/setting";
import ArticleCardList from "@/components/ArticleCardList.vue";

const useSetting = useSettingStore()

/// region 搜索
const searchInput = ref(null)
const keyword = ref('')
const page = ref(1)
const searchData = ref({})
const isSearching = ref(false)
const searchError = ref(null)
const searchArticle = async () => {
    if (keyword.value.trim() === '') return
    searchError.value = null
    try {
        searchData.value = await api(`/article?keyword=${keyword.value}&page=${page.value - 1}&size=${useSetting.settings?.pageSize ?? 12}`)
    } catch (e) {
        searchError.value = e
    } finally {
        isSearching.value = false
    }
}
// 监听分页，搜索数据
watch(page, searchArticle)

</script>

<template>
    <v-dialog v-model="useSetting.searchDialog" width="95vw" max-width="800px"
              transition="dialog-top-transition" scrollable>
        <div class="rounded-xl" style="background-color: rgb(var(--v-theme-background));">
            <v-toolbar color="transparent">
                <v-btn icon dark @click="useSetting.searchDialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>搜索</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-text-field ref="searchInput" v-model="keyword" @keydown.enter="searchArticle()"
                              label="搜索标题、分类、标签"></v-text-field>
                <article-card-list :article-data="searchData" mdCols="6" :page="page" style="height: 70vh;overflow-y: auto"
                              @on-page="(p)=>page=p" @on-route="useSetting.searchDialog=false"></article-card-list>
            </v-container>
        </div>
    </v-dialog>
</template>

<style scoped>

</style>