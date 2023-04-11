import { LoginPage } from '../../user/page-object/Login.page'
import { IssuesPage } from '../page-object/Issues.page'
import { UserModel, createUserModel } from '../../user/model/user.model'
import { IssueModel, createIssueModel } from '../../issues/model/issues.model'
import { UserData, userData } from '../../user/data/user.data'
import { ResonForLocking, IssueData, issueData, IssueStatus } from '../../issues/data/issues.data'
import { MainPage } from '../../user/page-object/Main.page'

describe('Issues page', () => {
    let loginPage: LoginPage
    let issuesPage: IssuesPage
    const user: UserModel = createUserModel(userData)
    let mainPage: MainPage
    const issue: IssueModel = createIssueModel(issueData)

    before(async () => {
        issuesPage = new IssuesPage(browser)
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.setLogin(user.email)
        await loginPage.setPassword(user.password)
        await loginPage.login()
        await mainPage.openUserMenu()
        await issuesPage.openPage()
    })

    // желательно переименовать, например в пассивеном залоге ГОТОВО
    it('Issue should be created', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        expect(await issuesPage.getTextTitleIssue()).toEqual(issue.issueTitle)
    })

    it('User should edit the issue', async () => {
        //убрать клики из названия ГОТОВО
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        await issuesPage.editIssue()
        await issuesPage.changeNameIssue(issue.newNameIssue)
        //вынести нажатие кнопки ГОТОВО
        await issuesPage.saveIssue()

        expect(await issuesPage.getTextTitleIssue()).toEqual(issue.newNameIssue)
    })

    it('Photo should be uploaded in issue', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)

        await issuesPage.uploadFile(issue.image)
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

    it('The comment should be blocked', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        await browser.pause(5000)

        await issuesPage.selectLockConversation()
        await issuesPage.selectMainButtonReasonForLocking()
        await issuesPage.selectReasonForLocking(ResonForLocking.SPAM)
        await issuesPage.saveLockConversation()

        expect(await issuesPage.isExistSpamTextUnderComment()).toEqual(true)

    })

    it('The issue with tag "Bug" should be found', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)

        await issuesPage.openLabelsSettingsPopup()
        await issuesPage.selectLabelsSettingsBug()
        await issuesPage.openLabelsSettingsPopup()
        await issuesPage.subbmitIssue()

        await browser.pause(5000)

        await issuesPage.openPage()
        await issuesPage.selectLabelsButton()
        await issuesPage.selectBugButton()
        await browser.pause(5000)
        await issuesPage.foundIssue(issue.issueTitle)

        expect(await issuesPage.isExistFoundIssue(issue.issueTitle)).toEqual(true)
    })

    it('The issue should be closed', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        await issuesPage.openPage()
        await issuesPage.foundIssue(issue.issueTitle)
        await issuesPage.selectCheckboxIssue(issue.issueTitle)
        await issuesPage.selectMarkAsButton()
        await issuesPage.selectActionInMarkAsButton(IssueStatus.CLOSED)

        expect(await issuesPage.isExistClosedIssue()).toEqual(true)
    })

    it('The issue should be deleted', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        await issuesPage.selectDeleteIssueButton()
        await issuesPage.selectDeleteIssueButtonInPopup()

        expect(await issuesPage.isExistMessageDeleteIssue()).toEqual(true)
    })

    it.only('The issue should be assigned to the user', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)
        await issuesPage.subbmitIssue()

        await issuesPage.selectAssigneesButton()
        await issuesPage.userSearch(user.login)
        await issuesPage.selectAssigneesButton()

        expect(await issuesPage.isUserAssignees()).toEqual(true)

    })

})