import axios from 'axios';

class HttpRequest {
    constructor() {
        // this.parmas = {};
    }

    private getConfig() {
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        const headerList: string[] = ['uid', 'token'];
        headerList.forEach((header: string) => {
            if (window.sessionStorage[header]) {
                config.headers[header] = window.sessionStorage[header];
            }
        });
        return config;
    }
}

