import { ChainablePromiseElement } from 'webdriverio'

class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    private getLoginField() {
        return this.browser.$('//*[@id="login_field"]')
    }

    //: ChainablePromiseElement<Promise<WebdriverIO.Element>>
    private getLoginButton() {
        return this.browser.$('//*[@type="submit"]')
    }

    private  getPasswordField() {
        return this.browser.$('//*[@id="password"]')
    }

    public getErrorMassage() {
        return this.browser.$('//*[@id="js-flash-container"]')
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

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }
}
export {
    LoginPage,
}
