import { LoginPage } from '../page-object/Login.page'
import { LOGIN, EMAIL, PASSWORD } from "../../../../credentials"
import { MainPage } from '../page-object/Main.page'

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('User should be log in by login', async () => {
        await loginPage.login(LOGIN, PASSWORD)

        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('User should be log in by email', async () => {
        await loginPage.login(EMAIL, PASSWORD)

        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('User should not be log in. Invalid email', async () => {
        const INVALID_EMAIL = '@123'
        await loginPage.invalidLogin(INVALID_EMAIL, PASSWORD)

        expect(await loginPage.getErrorMassage().isDisplayed()).toEqual(true)
    })

    it('User should not be log in. Password is not filled', async () => {
        const INVALID_PASSWORD = ''
        await loginPage.invalidLogin(EMAIL, INVALID_PASSWORD)

        expect(await loginPage.getErrorMassage().isDisplayed()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})