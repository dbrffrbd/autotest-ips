import { getRandomString, getRandomInteger, getTime } from "../../../common/data/tests.data"
import { userData } from "../../user/data/user.data"

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
    filePath: string,
    state: string,
    comment: string,
    assignees: string[],
    owner: string,
    repo: string,
}

function createIssueData(): IssueData {
    return {
        issueTitle: `Имя задачи-${getRandomString(getRandomInteger(1, 234))}-${getTime()}`,
        newNameIssue: `Новое имя задачи-${getRandomString(getRandomInteger(1, 228))}-${getTime()}`,
        filePath: 'src/common/data/files/cat.jpg',
        state: 'open',
        comment: `Комментарий задачи-${getRandomString(getRandomInteger(1, 2000))}-${getTime()}`,
        assignees: [userData.login],
        owner: 'dbrffrbd',
        repo: 'autotest-ip',
    }
}

export {
    IssueData,
    createIssueData,
    ResonForLocking,
    IssueStatus,
}
