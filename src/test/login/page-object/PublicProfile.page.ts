import { ChainablePromiseElement } from 'webdriverio'

class PublicProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    private getUserName() {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getBio() {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getPronouns() {
        return this.browser.$('//*[@id="user_profile_pronouns_select"')
    }

    private getUpdateProfileButton() {
        return this.browser.$('//*[@id="edit_user_122481302"]/div/p[2]/button')
    }

    private getViewProfileButton() {
        return this.browser.$('/html/body/div[1]/div[5]/main/div[1]/div/div/a')
    }

    public getPublicEmail() {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    public async saveName(name: string): Promise<void> {
        await this.getUserName().clearValue()
        await this.getUserName().setValue(name)
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update button was not clickable'
        })
        await this.getUpdateProfileButton().click()

        await this.getViewProfileButton().waitForClickable({
            timeoutMsg: 'Link in massage "Profile updated successfully" not clickable'
        })
        await this.getViewProfileButton().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }
}
export {
    PublicProfile,
}