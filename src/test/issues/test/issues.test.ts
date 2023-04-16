import { LoginPage } from '../../user/page-object/Login.page'
import { IssuesPage } from '../page-object/Issues.page'
import { UserModel, createUserModel } from '../../user/model/user.model'
import { IssueModel, createIssueModel } from '../../issues/model/issues.model'
import { userData } from '../../user/data/user.data'
import { ResonForLocking, IssueStatus, createIssueData } from '../../issues/data/issues.data'
import { MainPage } from '../../user/page-object/Main.page'
import { LOGIN, REPO } from '../../../../credentials'
import { IssueAPIService } from '../../../common/api/api-service/IssueAPIService'

describe('Issues page', () => {
    let loginPage: LoginPage
    let issuesPage: IssuesPage
    const user: UserModel = createUserModel(userData)
    let mainPage: MainPage
    let issue: IssueModel

    before(async () => {
        issuesPage = new IssuesPage(browser)
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        await mainPage.openUserMenu()
    })

    beforeEach(async () => {
        await issuesPage.openPage()
        issue = createIssueModel(createIssueData())
    })

    it('Issue should be created', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        expect(await issuesPage.getTextTitleIssue()).toEqual(issue.issueTitle)
    })

    it('Photo should be uploaded in issue', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.uploadFile(issue.filePath)
        await issuesPage.subbmitIssue()

        expect(await issuesPage.isImageLoading()).toEqual(true)
    })

    it('The comment should be added to the task', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.selectCommentField()
        await issuesPage.setCommentIssue(issue.comment)
        await issuesPage.subbmitIssue()

        expect(await issuesPage.getTextCommentIssue()).toEqual(issue.comment)
    })

    describe('Issues edit', () => {
        beforeEach(async () => {
            await IssueAPIService.createIssue(issue, LOGIN, REPO)
            await issuesPage.openPage()
            await issuesPage.foundIssue(issue.issueTitle)
            await issuesPage.openIssue(issue.issueTitle)
        })

        it('User should edit the issue', async () => {
            await issuesPage.editIssue()
            await issuesPage.changeNameIssue(issue.newNameIssue)
            await issuesPage.saveChangesIssue()

            expect(await issuesPage.getTextTitleIssue()).toEqual(issue.newNameIssue)
        })

        it('The comment should be blocked', async () => {
            await issuesPage.selectLockConversation()
            await issuesPage.selectMainButtonReasonForLocking()
            await issuesPage.selectReasonForLocking(ResonForLocking.SPAM)
            await issuesPage.saveLockConversation()

            expect(await issuesPage.isExistSpamTextUnderComment()).toEqual(true)
        })

        it('The issue should be closed', async () => {
            await issuesPage.openPage()
            await browser.pause(2000)
            await issuesPage.foundIssue(issue.issueTitle)
            await issuesPage.selectCheckboxIssue(issue.issueTitle)
            await issuesPage.selectMarkAsButton()
            await issuesPage.selectActionInMarkAsButton(IssueStatus.CLOSED)

            expect(await issuesPage.isExistClosedIssue()).toEqual(true)
        })

        it('The issue should be deleted', async () => {
            await issuesPage.selectDeleteIssueButton()
            await issuesPage.selectDeleteIssueButtonInPopup()

            expect(await issuesPage.isExistMessageDeleteIssue()).toEqual(true)
        })

        it('The issue with tag "Bug" should be found', async () => {
            await issuesPage.openLabelsSettingsPopup()
            await issuesPage.selectLabelsSettingsBug()
            await issuesPage.openLabelsSettingsPopup()

            await issuesPage.openPage()
            await issuesPage.selectLabelsButton()
            await issuesPage.selectBugButton()
            await issuesPage.foundIssue(issue.issueTitle)

            expect(await issuesPage.isExistFoundIssue(issue.issueTitle)).toEqual(true)
        })

        it('The issue should be assigned to the user', async () => {
            await browser.pause(2000)
            await issuesPage.selectAssigneesButton()
            await issuesPage.userSearch(user.login)
            await issuesPage.selectAssigneesButton()
            expect(await issuesPage.isUserAssignees()).toEqual(true)

        })

        it('Delete an assignment from a task', async () => {
            await browser.pause(2000)
            await issuesPage.selectAssigneesButton()
            await issuesPage.userSearch(user.login)
            await issuesPage.selectAssigneesButton()

            await issuesPage.selectAssigneesButton()
            await issuesPage.clearAssignees()

            expect(await issuesPage.isNoAssignees()).toEqual(false)
        })
    })
})
