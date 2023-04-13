import { AxiosResponse } from "axios"
import { IssueModel } from "../../../test/issues/model/issues.model"
import { IssueAPIProvider } from "../api-provider/IssueAPIProvider"
import { CreateIssueRequest, IssueAPIDataProvider } from "../api-data.provider/issueAPIDataProvider"

type CreateIssueResponse = {
    id: number,
    title: string,
    state: string,
    html_url: string,
}

class IssueAPIService {
    public static async createIssue(
        issue: IssueModel,
        owner: string,
        repo: string,
    ): Promise<AxiosResponse<CreateIssueResponse>> {
        try {
            const data: CreateIssueRequest = IssueAPIDataProvider.getCreationIssueData(issue)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)
            return response
        } catch (error) {
            throw new Error(`Create issue failed ${error}`)
        }
    }
}

export {
    CreateIssueResponse,
    IssueAPIService,
}