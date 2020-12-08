import ajax from '@/libs/axios';
import { ResponseType } from '@/libs/type-list';
import { AxiosPromise } from 'axios';
import url from './baseUrl';

const { baseUrl } = url;

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

