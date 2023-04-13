import { IssueData } from '../data/issues.data'

type IssueModel = {
    issueTitle: string,
    newNameIssue: string,
    filePath: string,
    state: string,
    comment: string,
    assignees: string[],
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        issueTitle: data.issueTitle,
        newNameIssue: data.newNameIssue,
        filePath: data.filePath,
        state: data.state,
        comment: data.comment,
        assignees: data.assignees,
    }
}

export {
    IssueModel,
    createIssueModel,
}