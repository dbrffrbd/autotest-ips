import { ChainablePromiseElement } from 'webdriverio'

class IssuesPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/dbrffrbd/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    //упростить имя (ГОТОВО)
    public async openPage(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async changeNameIssue(newNameIssue: string): Promise<void> {
        await this.getEditField().waitForDisplayed({
            timeoutMsg: 'Field for edit issue does not clickable'
        })
        await this.getEditField().setValue(newNameIssue)
        //сделай клик отдельно ГОТОВО
        // await this.saveIssue()
    }

    public async saveIssue(): Promise<void> {
        await this.getButtonSaveEditIssue().waitForClickable({
            timeoutMsg: 'Save button does not clickable'
        })
        await this.getButtonSaveEditIssue().click()
    }

    public async editIssue(): Promise<void> {
        await this.getButtonEditIssue().click()
    }

    public async setTitleValue(titleIssues: string): Promise<void> {
        await this.getTitleField().setValue(titleIssues)
    }

    public async subbmitIssue(): Promise<void> {
        await this.getSaveIssueButton().waitForClickable({
            timeoutMsg: 'Button does not clickable'
        })
        await this.getSaveIssueButton().click()
    }

    public async createIssue(): Promise<void> {
        await this.getNewIssueButton().waitForClickable({
            timeoutMsg: 'Button does not clickable'
        })
        await this.getNewIssueButton().click()
    }

    public async getTextTitleIssue(): Promise<string> {
        await this.getTitleCreatedIssue().waitForDisplayed({
            timeoutMsg: 'Issue title does not exist'
        })
        return this.getTitleCreatedIssue().getText()
    }

    public async uploadFile(filePath: string): Promise<void> {
        const inputElem = await this.browser.$('//input[@type="file"]')
        await inputElem.waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        // await this.browser.pause(3000)
        const file: string = await this.browser.uploadFile(filePath)
        inputElem.setValue(file)

        await this.browser.pause(5000)
        // await this.getAttachFilesButton().setValue(file)
    }

    //is... ГОТОВО
    public async isImageLoading(): Promise<boolean> {
        await this.getAttachedImage().waitForDisplayed({
            timeoutMsg: 'The picture did not load',
        })
        return this.getAttachedImage().isDisplayed()
    }

    public async attachFiles(): Promise<void> {
        await this.getAttachFilesButton().waitForClickable({
            timeoutMsg: 'The file upload button did not clicable',
        })
        await this.getAttachFilesButton().click()
    }

    //избавиться от кликов ГОТОВО
    public async saveCommentButton(): Promise<void> {
        await this.getSaveCommentButton().waitForClickable({
            timeoutMsg: 'The file upload button did not clicable',
        })
        await this.getSaveCommentButton().click()
    }

    private getSaveCommentButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-new-comment-form-actions"]//*[contains(@class, "btn-primary")]')
    }

    private getAttachFilesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="fc-issue_body"]')
    }

    private getAttachedImage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="d-block"]//*/a/img')
    }

    private getNewIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "ml-3")]//*[contains(@class, "btn")]')
    }

    private getSaveIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "flex-items-center")]//*[contains(@class, "btn-primary")]')
    }

    private getButtonEditIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]//*[contains(@class, "gh-header-actions")]/button[1]')
    }

    private getEditField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getButtonSaveEditIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "mt-2")]//*[contains(@class, "Button--secondary")]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    //неправильный xpath, ЭЛЕМЕНТ ДОЛЖЕН БЫТЬ ОДИН ГОТОВО
    private getTitleCreatedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "gh-header-title")]/bdi')
    }
}
export {
    IssuesPage,
}