import { getRandomString, getRandomInteger, getTime } from "../../../common/data/tests.data"

enum ResonForLocking {
    NOT = 1,
    OFF_TOPIC = 2,
    TOO_HEATED = 3,
    RESOLVED = 4,
    SPAM = 5,
}

enum IssueStatus {
    OPEN = 1,
    CLOSED = 2,
}

type IssueData = {
    issueTitle: string,
    newNameIssue: string,
    image: string,
    state: string,
    comment: string,
}

const issueData: IssueData = {
    issueTitle: `Имя задачи-${getRandomString(getRandomInteger(1, 234))}-${getTime()}`,
    newNameIssue: `Новое имя задачи-${getRandomString(getRandomInteger(1, 228))}-${getTime()}`,
    image: 'src/files/cat.jpg',
    state: 'open',
    comment: `Комментарий задачи-${getRandomString(getRandomInteger(1, 2000))}-${getTime()}`,
}

function createIssueData(): IssueData {
    return {
        issueTitle: `Имя задачи-${getRandomString(getRandomInteger(1, 234))}-${getTime()}`,
        newNameIssue: `Новое имя задачи-${getRandomString(getRandomInteger(1, 228))}-${getTime()}`,
        image: 'src/files/cat.jpg',
        state: 'open',
        comment: `Комментарий задачи-${getRandomString(getRandomInteger(1, 2000))}-${getTime()}`,
    }
}

export {
    IssueData,
    issueData,
    createIssueData,
    ResonForLocking,
    IssueStatus,
}
