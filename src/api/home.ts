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

