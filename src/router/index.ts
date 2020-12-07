import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getUid, getToken } from '@/libs/session';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: '登录',
        component: () => import('@/pages/Login.vue'),
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/Index.vue'),
        children: [
            {
                path: 'home',
                name: '首页',
                component: () => import('@/pages/home/Home.vue'),
            },
            {
                path: 'content-my',
                name: '我的课程',
                component: () => import('@/pages/my/ContentMy.vue'),
            },
            {
                path: 'order-my',
                name: '我的订单',
                component: () => import('@/pages/my/OrderMy.vue'),
            },
            {
                path: 'user-center',
                name: '用户中心',
                component: () => import('@/pages/UserCenter.vue'),
            },
            {
                path: 'content-detail',
                name: '课程详情',
                component: () => import('@/pages/detail/ContentDetail.vue'),
            },
            {
                path: 'catalog-list',
                name: '目录列表',
                component: () => import('@/pages/CatalogList.vue'),
            },
        ],
    },
    {
        path: '/study',
        name: '我的学习',
        component: () => import('@/pages/study/Index.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // const uid: string = getUid();
    // const token: string = getToken();
    // if ((!uid || !token) && to.path !== '/login') {
    //     return next({ path: '/login' });
    // }
    return next();
});

export default router;
