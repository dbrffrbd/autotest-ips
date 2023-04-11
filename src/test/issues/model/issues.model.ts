import { IssueData } from '../data/issues.data'

type IssueModel = {
    issueTitle: string,
    newNameIssue: string,
    image: string,
    state: string,
    comment: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        issueTitle: data.issueTitle,
        newNameIssue: data.newNameIssue,
        image: data.image,
        state: data.state,
        comment: data.comment
    }
}

export {
    IssueModel,
    createIssueModel,
}