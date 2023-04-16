import { ChainablePromiseElement } from 'webdriverio'
import { PronounsType } from '../data/user.data'

class PublicProfile {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getValueExpectPronoun(pronoun: PronounsType): Promise<string> {
        return this.getPronoun(pronoun).getValue()
    }

    public isFieldLock(): Promise<boolean> {
        return this.getPublicEmail().isClickable()
    }

    public isMessagePicture(): Promise<boolean> {
        return this.getSetMassage().isDisplayed()
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

    public async selectPronoun(pronoun: PronounsType): Promise<void> {
        await this.getPronouns().waitForClickable({
            timeoutMsg: 'Pronouns not clickable'
        })
        await this.getPronouns().click()

        await this.getPronoun(pronoun).waitForClickable({
            timeoutMsg: 'Pronoun not clickable'
        })
        await this.getPronoun(pronoun).click()
    }

    public async setBio(textBio: string): Promise<void> {
        await this.getBio().clearValue()
        await this.getBio().setValue(textBio)
    }

    public async setUserName(name: string): Promise<void> {
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
        await this.getSetPictureButton().waitForClickable({
            timeoutMsg: 'Set picture button was not clickable'
        })
        await this.getSetPictureButton().click()
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getSetPictureButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="avatar-crop-form"]//*[@type="submit"]')
    }

    private getPronoun(pronoun: PronounsType): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@id="user_profile_pronouns_select"]/option[${pronoun}]`)
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getPublicEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getSetMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]')
    }

    private getUpdateProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "Button--primary")]')
    }

    private getUserName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
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