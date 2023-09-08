import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/archive',
        name: 'Archive',
        component: () => import('@/views/Archive.vue')
    },
    {
        path: '/:path',
        name: 'Article',
        component: () => import('@/views/Article.vue'),
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import('@/views/EditArticle.vue')
    },
    {
        path: '/tag',
        redirect: '/archive'
    },
    {
        path: '/tag/:tag',
        name: 'Tag',
        component: () => import('@/views/Tags.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})



export default router
