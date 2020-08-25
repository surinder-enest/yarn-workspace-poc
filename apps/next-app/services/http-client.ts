import axios from 'axios';

export class HttpClient {
    client: any;

    constructor(params: any) {
        this.client = axios.create({
            ...params,
            baseURL: 'https://stageapi.mindmemobile.com/',
        });
    }

    get(url: string, params: any) {
        return this.client.get(params ? `${url}?${params}` : url);
    }

    post(url: string, data: any, progressCallback: any) {
        return this.client.post(url, data, progressCallback);
    }

    put(url: string, data: any) {
        return this.client.put(url, data);
    }

    delete(url: string, params: any) {
        return this.client.delete(params ? `${url}?${params}` : url);
    }

    patch(url: string, data: any) {
        return this.client.patch(url, data);
    }

    successHandler(response: any) {
        return response;
    }

    errorHandler(error: any) {
        throw error;
    }
}
