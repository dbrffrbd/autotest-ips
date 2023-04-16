import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { PERSONAL_TOKEN } from '../../../../credentials'

class GitAPIProvider {
    protected headers: AxiosRequestHeaders = {}
    protected personalToken = PERSONAL_TOKEN
    protected isSuccessful: boolean

    constructor(isSuccessful: boolean = true) {
        this.isSuccessful = isSuccessful
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${this.personalToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    }

    public getHeaders(): AxiosRequestHeaders {
        return this.headers
    }

    public sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.isSuccessful) {
            return axios(config)
        }

        return axios(config)
            .then(response => response)
            .catch(error => error.response)
    }

    public static configureRequest(
        methodUrl: string,
        method: Method,
        requestHeaders: AxiosRequestHeaders,
        data?: string): AxiosRequestConfig {
        return {
            method: method,
            url: `https://api.github.com${methodUrl}`,
            headers: requestHeaders,
            data: data,
        }
    }
}

export {
    GitAPIProvider,
}