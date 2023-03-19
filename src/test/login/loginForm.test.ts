import { LOGIN, EMAIL, PASSWORD } from "../../../credentials"

describe('Login form test', async () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('User should be log in by login', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//summary//*[contains(@class, "avatar")]').waitForClickable({
            timeoutMsg: 'Avatar was not displayed'
        })

        await browser.$('//summary//*[contains(@class, "avatar")]').click()

        await browser.$('//*[@class="css-truncate-target"]').waitForDisplayed({
            timeoutMsg: 'Login was not displayed. Menu was not displayed'
        })

        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    it('User should be log in by email', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(EMAIL)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//summary//*[contains(@class, "avatar")]').waitForClickable({
            timeoutMsg: 'Avatar was not displayed'
        })

        await browser.$('//summary//*[contains(@class, "avatar")]').click()

        await browser.$('//*[@class="css-truncate-target"]').waitForDisplayed({
            timeoutMsg: 'Login in menu was not displayed'
        })

        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    it('User should not be log in. Invalid email', async () => {
        const INVALID_EMAIL = '@123'
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(INVALID_EMAIL)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//*[@id="js-flash-container"]').waitForDisplayed({
            timeoutMsg: 'Message was not displayed'
        })

        await browser.$('//*[@id="js-flash-container"]').waitForDisplayed({
            timeoutMsg: 'Message was not displayed'
        })

        expect(await browser.$('//*[@id="js-flash-container"]').isDisplayed()).toEqual(true)
    })

    it('User should not be log in', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(EMAIL)
        await browser.$('//*[@id="password"]').setValue('')
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//*[@id="js-flash-container"]').waitForDisplayed({
            timeoutMsg: 'Message was not displayed'
        })

        expect(await browser.$('//*[@id="js-flash-container"]').isDisplayed()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})