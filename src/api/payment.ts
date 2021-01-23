import ajax from '@/libs/axios';
import { ResponseType } from '@/libs/type-list';
import { AxiosPromise } from 'axios';
import url from './baseUrl';

const { baseUrl } = url;
export const payOrder = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/pay/order',
        data,
        method: 'post',
    });
};

export const paySecondOrder = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/pay/secondOrder',
        data,
        method: 'post',
    });
};

export const getOrderStatus = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/pay/confirm',
        data,
        method: 'post',
    });
};
export const getSecondOrderStatus = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: baseUrl + '/pay/confirmSecond',
        data,
        method: 'post',
    });
};
