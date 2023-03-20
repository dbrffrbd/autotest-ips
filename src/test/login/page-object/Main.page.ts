import { ChainablePromiseElement } from 'webdriverio'

class MainPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    //: ChainablePromiseElement<Promise<WebdriverIO.Element>> 
    private getUserAvatar() {
        return this.browser.$('//summary//*[contains(@class, "avatar")]')
    }

    private getUserLogin() {
        return this.browser.$('//*[@class="css-truncate-target"]')
    }

    public getUserLoginText(): Promise<string> {
        return this.getUserLogin().getText()
    }

    public async openUserMenu(): Promise<void> {
        await this.getUserAvatar().waitForClickable({
            timeoutMsg: 'User avatar was not clicable'
        })
        await this.getUserAvatar().click()
        await this.getUserLoginText()
    }
}

export {
    MainPage,
}