import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getUid, getToken } from '@/libs/session';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/Login.vue'),
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/HomeBar.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/page/Home.vue'),
            },
            {
                path: '/content-list',
                name: 'ContentList',
                component: () => import('@/page/ContentList.vue'),
            },
            {
                path: '/content-my',
                name: 'ContentMy',
                component: () => import('@/page/ContentMy.vue'),
            },
            {
                path: '/content-detail',
                name: 'ContentDetail',
                component: () => import('@/page/ContentDetail.vue'),
            },
            {
                path: '/catalog-list',
                name: 'CatalogList',
                component: () => import('@/page/CatalogList.vue'),
            },
        ],
    },
    {
        path: '/study',
        name: 'Study',
        component: () => import('@/page/study/Index.vue'),
    },
    {
        path: '*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const uid: string = getUid();
    const token: string = getToken();
    if ((!uid || !token) && to.path !== '/login') {
        return next({ path: '/login' });
    }
    return next();
});

export default router;
