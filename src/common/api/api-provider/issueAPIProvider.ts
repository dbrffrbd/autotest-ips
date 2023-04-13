import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GitAPIProvider } from './GitAPIProvider'
import { CreateIssueRequest } from '../api-data.provider/IssueAPIDataProvider';

class IssueAPIProvider extends GitAPIProvider {
    public createIssue<T>(owner: string, repo: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}