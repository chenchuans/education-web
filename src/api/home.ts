import ajax from '@/libs/axios';
import { ResponseType } from '@/libs/type-list';
import { AxiosPromise } from 'axios';
import url from './baseUrl';

const { baseUrl } = url;

// 首页 -> 展示课程详情
export const getCourseDetail = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/font/home/courseDetail',
        data,
        method: 'post',
    });
};

// 首页 -> 展示首页信息以及首页搜索
export const getHomeList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/font/home/list',
        data,
        method: 'post',
    });
};

// 我的页面 -> 课程信息
export const getMyCourseInfo = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/font/main/getCourseInfo',
        data,
        method: 'get',
    });
};

// 我的页面 -> 订单信息
export const getMyOrderInfo = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/font/main/getMyOrderInfo',
        data,
        method: 'get',
    });
};

