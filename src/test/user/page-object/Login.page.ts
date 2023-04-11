import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../model/user.model'
import { Reporter } from '../../../common/reporter/Reporter'

class LoginPage {
    private browser: WebdriverIO.Browser
    private url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async setLogin(login: string): Promise<void> {
        Reporter.addStep('Подождать отображения поля Login')
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        Reporter.addStep(`Ввести логин ${login}`)
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        Reporter.addStep('Подождать отображения поля Password')
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password field was not displayed'
        })
        Reporter.addStep(`Ввести пароль ${password}`)
        await this.getPasswordField().setValue(password)
    }

    public async login(): Promise<void> {
        Reporter.addStep('Подождать кликабельности кнопки Login')
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        Reporter.addStep('Залогиниться')
        await this.getLoginButton().click()
    }

    public massageDisplayed(): Promise<boolean> {
        Reporter.addStep('Проверить отображение сообщения об ошибке логинации')
        return this.getErrorMassage().isDisplayed()
    }

    public async open(): Promise<void> {
        Reporter.addStep('Подождать открытия страницы логинации')
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
