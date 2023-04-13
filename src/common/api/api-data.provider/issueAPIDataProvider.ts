import { IssueModel } from "../../../test/issues/model/issues.model"

type CreateIssueRequest = {
    title: string | number,
    body?: string,
    labels?: string[],
    assignees?: string[],
}

class IssueAPIDataProvider {
    public static getCreationIssueData(issue: IssueModel): CreateIssueRequest {
        return {
            title: issue.issueTitle,
        }
    }
}

export {
    CreateIssueRequest,
    IssueAPIDataProvider,
}