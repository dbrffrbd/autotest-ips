import { LoginPage } from '../../user/page-object/Login.page'
import { IssuesPage } from '../page-object/Issues.page'
import { UserModel, createUserModel } from '../../user/model/user.model'
import { IssueModel, createIssueModel } from '../../issues/model/issues.model'
import { UserData, userData } from '../../user/data/user.data'
import { IssueData, issueData } from '../../issues/data/issues.data'
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

    it.only('Photo should be uploaded in issue', async () => {
        await issuesPage.createIssue()
        await issuesPage.setTitleValue(issue.issueTitle)

        await issuesPage.uploadFile(issue.image)
        await issuesPage.subbmitIssue()

        expect(await issuesPage.isImageLoading()).toEqual(true)
    })

})