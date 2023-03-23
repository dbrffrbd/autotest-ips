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

    public getUserBioText(): Promise<string> {
        return this.browser.$('//*[contains(@class, "p-note")]').getText()
    }

    public async chekingUserProfileName(): Promise<void> {
        await this.getFrameUserProfile().waitForDisplayed({
            timeoutMsg: 'User profile page did not load'
        })
        await this.getUserNameText()
    }

    public async chekingUserProfileBio(): Promise<void> {
        await this.getFrameUserProfile().waitForDisplayed({
            timeoutMsg: 'User profile page did not load'
        })
        await this.getUserBioText()
    }

    public async openEditProfile(): Promise<void> {
        await this.getFrameUserProfile().waitForDisplayed({
            timeoutMsg: 'User profile page did not load'
        })
        await this.getButtonEditProfile().waitForClickable({
            timeoutMsg: 'Button Edit profile does not clicable'
        })
        await this.getButtonEditProfile().click()
    }

    public getValueInFieldName(): Promise<string> {
        return this.getNameFiled().getValue()
    }

    public getValueUserPronouns(): Promise<string> {
        return this.getUserPronouns().getText()
    }

    private getFrameUserProfile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user-profile-frame"]')
    }

    private getButtonEditProfile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-profile-editable-edit-button")]')
    }

    private getNameFiled(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getUserPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@itemprop, "pronouns") ]')
    }
}
export {
    UserProfile,
}