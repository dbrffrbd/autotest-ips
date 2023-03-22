import { ChainablePromiseElement } from 'webdriverio'

class UserProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/dbrffrbd'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getUserNameText(): Promise<string> {
        return this.browser.$('//*[contains(@class, "p-name")]').getText()
    }

    public async openUserProfile(): Promise<void> {
        await this.getFrameUserProfile().waitForDisplayed({
            timeoutMsg: 'User profile page did not load'
        })
        await this.getUserNameText()
    }

    private getFrameUserProfile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user-profile-frame"]')
    }
}
export {
    UserProfile,
}