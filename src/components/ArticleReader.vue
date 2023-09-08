<script setup>
import {MdCatalog, MdPreview} from 'md-editor-v3'
import {ref} from 'vue'
import {useDisplay} from 'vuetify'
import 'md-editor-v3/lib/preview.css'
import {useThemeStore} from "@/stores/theme";

const scrollElement = document.documentElement
const themeStore = useThemeStore()

const props = defineProps({
    data: {type: Object},
})

const {mobile} = useDisplay()
const catalogDrawer = ref(!mobile.value)
</script>

<template>
    <v-container class="markdown px-0 pt-0">
        <MdPreview class="rounded-xl border" editor-id="read" :modelValue="data?.content ?? ''" preview-theme="default"
                   codeTheme="atom"
                   :theme="themeStore.isDark?'dark':'light'"/>
        <v-navigation-drawer class="position-fixed catalog" v-if="data" v-model="catalogDrawer" location="right">
            <div class="ml-1 my-5 mt-16">
                <MdCatalog :scroll-element="scrollElement" :scroll-element-offset-top="60" editor-id="read"
                           :theme="themeStore.isDark?'dark':'light'"/>
            </div>
        </v-navigation-drawer>
        <v-tooltip text="目录">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="d-lg-none drawer-btn text-primary" @click="catalogDrawer=true"
                       icon="mdi-menu"></v-btn>
            </template>
        </v-tooltip>
    </v-container>
</template>

<style scoped>
.markdown :deep(.md-editor) {
    font-family: var(--fonts-proportional) !important;
}
</style>