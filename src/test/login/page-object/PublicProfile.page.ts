import { ChainablePromiseElement } from 'webdriverio'

class PublicProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public cheackMassagePicture(): Promise<boolean> {
        return this.getSetMassage().isDisplayed()
    }

    public checkingFieldLock(): Promise<boolean> {
        return this.getPublicEmail().isClickable()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async savePublicProfileChanges(): Promise<void> {
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update button was not clickable'
        })
        await this.getUpdateProfileButton().click()
    }

    public async selectPronounsShe(): Promise<void> {
        await this.getPronouns().waitForClickable({
            timeoutMsg: 'Pronouns not clicked'
        })
        await this.getPronouns().click()
        await this.getPronounsShe().click()
    }

    public async setBio(textBio: string): Promise<void> {
        await this.getBio().clearValue()
        await this.getBio().setValue(textBio)
    }

    public async setUserName(name: string): Promise<void> {
        await this.getUserName().waitForClickable()
        await this.getUserName().clearValue()
        await this.getUserName().setValue(name)
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
        await this.getSetPictureButton().click()
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
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getPronounsShe(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]/option[3]')
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

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getSetPictureButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "Button--fullWidth")]')
    }

    private getSetMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "flash-notice")]')
    }

}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    PublicProfile,
}