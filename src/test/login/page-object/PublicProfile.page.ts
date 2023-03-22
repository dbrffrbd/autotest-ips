import { ChainablePromiseElement } from 'webdriverio'

class PublicProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async setUserName(name: string): Promise<void> {
        await this.getUserName().clearValue()
        await this.getUserName().setValue(name)
    }

    public async savePublicProfileChanges(): Promise<void> {
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update button was not clickable'
        })
        await this.getUpdateProfileButton().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public checkingFieldLock(): Promise<boolean> {
        return this.getPublicEmail().isClickable()
    }

    public async viewProfile(): Promise<void> {
        await this.getViewProfileButton().waitForClickable({
            timeoutMsg: 'Link in massage "Profile updated successfully" not clickable'
        })
        await this.getViewProfileButton().click()
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"')
    }

    private getPublicEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getUpdateProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "Button--primary")]')
    }

    private getUserName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getViewProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-flash-alert")]/a')
    }
}
export {
    PublicProfile,
}