/**
 * @author wangheng
 * @since  2020/12/06
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { getUid, getToken, removeToken, removeUid, removeUsername } from '@/libs/session.ts';
import { Toast } from 'vant';

const validateUrlList: string[] = [
    '/font/home/courseDetail', '/font/home/list', '/user/userSmsLogin', '/user/userGetVC',
    ];

class Ajax {
    public request(options: AxiosRequestConfig): AxiosPromise {
        const instance: AxiosInstance = axios.create();
        options = this.mergeConfig(options);
        this.interceptors(instance, options.url);
        return instance(options);
    }


    private interceptors(instance: AxiosInstance, url?: string) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            const validateUrl: string = (url as string).slice(-10);
            if (!validateUrlList.includes(validateUrl)) {
                config.headers['token'] = getToken();
                config.headers['uuid'] = getUid();
            }
            return config;
        }, error => Promise.reject(error));

        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse<any>) => {
            const { code, message } = res.data;
            if (code === 211) {
                removeToken();
                removeUid();
                removeUsername();
                Toast('当前用户已经在其他地方登录，请及时修改密码!');
                window.location.hash = '#/login';
                return;
            }
            if (code !== 200) {
                // 提示 message 错误信息
                Toast(message);
            }
            return res.data;
        }, (error: string) => {
            // 提示网络错误
            Toast('网络错误,请检查网络');
            Promise.reject(error);
        });
    }

    private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
        return Object.assign({}, options);
    }
}

export default new Ajax();
