import ajax from '@/libs/axios';
import { ResponseType } from '@/libs/type-list';
import { AxiosPromise } from 'axios';
import url from './baseUrl';

const { baseUrl } = url;
export const login = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/user/userSmsLogin',
        data,
        method: 'post',
    });
};

export const getCode = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/user/userGetVC',
        data,
        method: 'post',
    });
};
