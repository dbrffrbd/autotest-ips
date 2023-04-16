import { LoginPage } from '../page-object/Login.page'
import { MainPage } from '../page-object/Main.page'
import { UserModel, createUserModel } from '../model/user.model'
import { INVALID_EMAIL, UserData, userData } from '../data/user.data'
import { EMPTY_VALUE } from '../../../common/data/tests.data'

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('User should be log in by login', async () => {
        await loginPage.setLogin(user.login)
        await loginPage.setPassword(user.password)
        await loginPage.submit()

        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('User should be log in by email', async () => {
        await loginPage.setLogin(user.email)
        await loginPage.setPassword(user.password)
        await loginPage.submit()

        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('User should not be log in. Invalid email', async () => {
        await loginPage.setLogin(INVALID_EMAIL)
        await loginPage.setPassword(user.password)
        await loginPage.submit()

        expect(await loginPage.massageDisplayed()).toEqual(true)
    })

    it('User should not be log in. Password is not filled', async () => {
        await loginPage.setLogin(user.email)
        await loginPage.setPassword(EMPTY_VALUE)
        await loginPage.submit()

        expect(await loginPage.massageDisplayed()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})