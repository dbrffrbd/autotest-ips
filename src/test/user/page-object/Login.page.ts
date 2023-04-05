import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../model/user.model'

class LoginPage {
    private browser: WebdriverIO.Browser
    private url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    // нужно убрать метод
    // public async invalidLogin(userEmail: string, password: string): Promise<void> {
    //     await this.getLoginField().waitForDisplayed({
    //         timeoutMsg: 'Login field was not displayed'
    //     })
    //     await this.getLoginField().setValue(userEmail)
    //     await this.getPasswordField().setValue(password)
    //     await this.getLoginButton().waitForClickable({
    //         timeoutMsg: 'Login button was not clickable'
    //     })
    //     await this.getLoginButton().click()
    //     await this.getErrorMassage().waitForDisplayed({
    //         timeoutMsg: 'Message about invalid email or login was not displayed'
    //     })
    // }

    // разделить на несколько методов (только для использования в login.test, для остальных тестов будет исользоваться)
    // public async login(user: UserModel): Promise<void> {
    //     await this.getLoginField().waitForDisplayed({
    //         timeoutMsg: 'Login field was not displayed'
    //     })
    //     await this.getLoginField().setValue(user.email)
    //     await this.getPasswordField().setValue(user.password)
    //     await this.getLoginButton().waitForClickable({
    //         timeoutMsg: 'Login button was not clickable'
    //     })
    //     await this.getLoginButton().click()
    // }

    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password field was not displayed'
        })
        await this.getPasswordField().setValue(password)
    }

    public async login(): Promise<void> {
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
