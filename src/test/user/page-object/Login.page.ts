import { ChainablePromiseElement } from 'webdriverio'

class LoginPage {
    private browser: WebdriverIO.Browser
    private url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async invalidLogin(userEmai: string, userPassword: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(userEmai)
        await this.getPasswordField().setValue(userPassword)
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await this.getLoginButton().click()
        await this.getErrorMassage().waitForDisplayed({
            timeoutMsg: 'Message about invalid email or login was not displayed'
        })
    }

    public async login(userEmai: string, userPassword: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(userEmai)
        await this.getPasswordField().setValue(userPassword)
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await this.getLoginButton().click()
    }

    public massageDisplayed(): Promise<boolean> {
        return this.getErrorMassage().isDisplayed()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getErrorMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]')
    }

    private getLoginButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }
}
export {
    LoginPage,
}
