import { ChainablePromiseElement } from 'webdriverio'

class UserProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/dbrffrbd'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getUserBioСontents(): Promise<string> {
        return this.getUserBio().getText()
    }

    public getValueInFieldName(): Promise<string> {
        return this.getNameFiled().getValue()
    }

    public isExistPronouns(): Promise<boolean> {
        return this.getUserPronouns().isExisting()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async openEditProfile(): Promise<void> {
        await this.getButtonEditProfile().waitForClickable({
            timeoutMsg: 'Button Edit profile does not clicable'
        })
        await this.getButtonEditProfile().click()
    }

    public async selectUserName(): Promise<string> {
        await this.getUserName().waitForExist({
            timeoutMsg: 'User name does not exist'
        })
        return this.getUserName().getText()
    }

    private getButtonEditProfile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-profile-editable-edit-button")]')
    }

    private getNameFiled(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getUserBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "p-note")]')
    }

    private getUserName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "p-name")]')
    }

    private getUserPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@itemprop, "pronouns")]')
    }
}
export {
    UserProfile,
}