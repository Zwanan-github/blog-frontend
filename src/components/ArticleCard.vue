<script setup>

import {useSettingStore} from "@/stores/setting";
import {computed} from "vue";
import {useDateFormat} from "@vueuse/core";
import colorMap from "@/utils/color-map";

const props = defineProps({
    article: {},
})

const emits = defineEmits(['onRoute'])

const settingStore = useSettingStore()

const updateDate = computed(() => props.article.updateDate)
const formattedDate = useDateFormat(updateDate, 'YYYY-MM-DD HH:mm')
</script>

<template>
    <router-link :to="`/${article.path}`" @click="emits('onRoute')"
                 class="text-decoration-none cover-link">
        <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" v-ripple border="border">
                <div class="cover-container">
                    <v-img height="180px" :src="article.cover" cover class="cover">
                        <template v-slot:error>
                            <v-img height="100%" width="100%" cover :src="settingStore.settings?.banner"></v-img>
                        </template>
                    </v-img>
                </div>
                <v-card-title class="article-name">{{ article.name }}</v-card-title>
                <v-card-item>
                    <div class="d-flex align-center flex-wrap">
                        <v-icon class="text-grey-darken-1 text-body-2">mdi-tag</v-icon>
                        <v-card-subtitle class="mx-1">标签:</v-card-subtitle>
                        <v-chip class="mr-1" size="small" v-for="tag in article.tags || []"
                                :color="colorMap(tag.name)" :to="`/tag/${tag.name}`">
                            {{ tag.name }}
                        </v-chip>
                        <v-card-subtitle v-if="article.tags?.length===0" class="mx-1">null</v-card-subtitle>
                    </div>

                </v-card-item>

                <v-card-subtitle class="mb-2">
                    <p class="text-caption">
                        {{ formattedDate }}
                    </p>
                </v-card-subtitle>

            </v-card>
        </v-hover>
    </router-link>
</template>

<style scoped>

</style>