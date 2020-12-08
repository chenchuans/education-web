import ajax from '@/libs/axios';
import { ResponseType } from '@/libs/type-list';
import { AxiosPromise } from 'axios';
import url from './baseUrl';

const { baseUrl } = url;

// 学习模块 -> 目录列表页面 -> 展示目录列表
export const getCatalogList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/learn/catalog/listCatalog',
        data,
        method: 'post',
    });
};

// 学习模块 -> 学习页面 -> 展示一开的已经有进展的学习内容
export const getAlreadyInfo = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/learn/content/listBeginContent',
        data,
        method: 'post',
    });
};

// 学习模块 -> 学习页面 -> 展示右边所有的小节和标题
export const getCatalogDetail = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/learn/content/listChapterAndTitle',
        data,
        method: 'post',
    });
};

// 学习模块 -> 学习页面-> 展示下一段有内容
export const getContentItem = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/learn/content/listNextContent',
        data,
        method: 'post',
    });
};

// 学习模块 -> 学习页面-> 答题
export const answer = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/learn/content/',
        data,
        method: 'post',
    });
};
