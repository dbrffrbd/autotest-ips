import { IssueData } from '../data/issues.data'

type IssueModel = {
    issueTitle: string,
    newNameIssue: string,
    image: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        issueTitle: data.issueTitle,
        newNameIssue: data.newNameIssue,
        image: data.image,
    }
}

export {
    IssueModel,
    createIssueModel,
}