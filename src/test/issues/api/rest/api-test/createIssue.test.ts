import { IssueModel, createIssueModel } from "../../../model/issues.model"
import { CreateIssueResponse } from "../../../../../common/api/api-service/issueAPIService"
import { createIssueData } from "../../../data/issues.data"
import { LOGIN, REPO } from "../../../../../../credentials"
import fetch, { Response } from 'node-fetch'
import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "../../../../../common/api/api-provider/issueAPIProvider"

describe('POST repos/{owner}/{repo}/issues', () => {
    let issue: IssueModel

    beforeEach(async () => {
        issue = createIssueModel(createIssueData())
    })

    it('issue should be created', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
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
})