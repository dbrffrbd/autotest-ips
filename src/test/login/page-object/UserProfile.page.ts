import { ChainablePromiseElement } from 'webdriverio'

class UserProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/dbrffrbd'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    private getFrameUserProfile() {
        return this.browser.$('//*[@id="user-profile-frame"]')
    }

    public getUserNameText(): Promise<string> {
        return this.browser.$('/html/body/div[1]/div[6]/main/div[2]/div/div[1]/div/div[2]/div[1]/div[2]/h1/span[1]').getText()
    }

    public async openUserProfile(): Promise<void> {
        await this.getFrameUserProfile().waitForDisplayed({
            timeoutMsg: 'User profile page did not load'
        })
        await this.getUserNameText()
    }
}
export {
    UserProfile,
}