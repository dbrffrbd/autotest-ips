import { IssueModel, createIssueModel } from "../../../model/issues.model"
import { CreateIssueResponse, IssueAPIService } from "../../../../../common/api/api-service/IssueAPIService"
import { createIssueData } from "../../../data/issues.data"
import { LOGIN, REPO } from "../../../../../../credentials"
import fetch, { Response } from 'node-fetch'
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { IssueAPIProvider } from "../../../../../common/api/api-provider/IssueAPIProvider"

describe('POST repos/{owner}/{repo}/issues', () => {
    let issue: IssueModel

    beforeEach(async () => {
        issue = createIssueModel(createIssueData())
    })

    it.only('issue should be created', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            LOGIN,
            REPO,
            {
                title: issue.issueTitle,
            }
        )

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(issue.issueTitle)
        expect(response.data.state).toEqual(issue.state)

        const responseUrl: Response = await fetch(response.data.html_url)

        expect(responseUrl.status).toEqual(200)
    })

    it.only('List issues', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.listRepositoryIssues(
            LOGIN,
            REPO,
        )

        expect(response.status).toEqual(200)
    })

    it('Request 404', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const config: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/vikkgri/privateRepo/issues`,
            'POST',
            issueAPIProvider.getHeaders(),
            JSON.stringify({
                title: issue.issueTitle,
            }),
        )
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.sendRequest(config)
        expect(response.status).toEqual(404)
    })

    it('Request 410', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const config: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/dbrffrbd/My_repo/issues`,
            'POST',
            issueAPIProvider.getHeaders(),
            JSON.stringify({
                title: issue.issueTitle,
            }),
        )
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.sendRequest(config)
        expect(response.status).toEqual(410)
    })

    it('Request 422', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const config: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/dbrffrbd/autotest-ips/issues`,
            'POST',
            issueAPIProvider.getHeaders(),
            JSON.stringify({
                title: true,
            }),
        )
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.sendRequest(config)
        expect(response.status).toEqual(422)
    })
})