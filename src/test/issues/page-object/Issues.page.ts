import { ChainablePromiseElement } from 'webdriverio'
import { ResonForLocking } from '../data/issues.data'

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

    public async openIssue(issueName: string): Promise<void> {
        await this.browser.pause(1000)
        await this.getFoundIssue(issueName).waitForClickable({
            timeoutMsg: 'The issue did not clicable',
        })
        await this.getFoundIssue(issueName).click()
    }

    public async changeNameIssue(newNameIssue: string): Promise<void> {
        await this.getEditField().waitForDisplayed({
            timeoutMsg: 'Field for edit issue does not clickable'
        })
        await this.getEditField().setValue(newNameIssue)
    }

    public async setCommentIssue(issueComment: string): Promise<void> {
        await this.getCommentField().waitForDisplayed({
            timeoutMsg: 'Field for comment issue does not clickable'
        })
        await this.getCommentField().setValue(issueComment)
    }

    public async saveChangesIssue(): Promise<void> {
        await this.getButtonSaveEditIssue().waitForClickable({
            timeoutMsg: 'Save button does not clickable'
        })
        await this.getButtonSaveEditIssue().click()
    }

    public async saveLockConversation(): Promise<void> {
        await this.getSaveLockConversationButton().waitForClickable({
            timeoutMsg: 'Save button does not clickable'
        })
        await this.getSaveLockConversationButton().click()
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
        await browser.pause(1000)
    }

    public async getTextTitleIssue(): Promise<string> {
        await this.getTitleCreatedIssue().waitForDisplayed({
            timeoutMsg: 'Issue title does not exist'
        })
        return this.getTitleCreatedIssue().getText()
    }

    public async getTextCommentIssue(): Promise<string> {
        await this.getCreatedComment().waitForDisplayed({
            timeoutMsg: 'Comment does not exist'
        })
        return this.getCreatedComment().getText()
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

    public async selectCommentField(): Promise<void> {
        await this.getCommentField().waitForClickable({
            timeoutMsg: 'The field "Leave a comment" did not clicable',
        })
        await this.getCommentField().click()
    }

    public async selectLabelsButton(): Promise<void> {
        await this.getLabelsButton().waitForClickable({
            timeoutMsg: 'The field "Labels" did not clicable',
        })
        await this.getLabelsButton().click()
    }

    public async selectLockConversation(): Promise<void> {
        await this.getLockAndUnlockConversation().waitForDisplayed({
            timeoutMsg: 'The button Lock/Unlock Conversation did not displayed',
        })
        await this.getLockAndUnlockConversation().click()
    }

    public async selectMainButtonReasonForLocking(): Promise<void> {
        await this.getMainButtonReasonForLocking().waitForClickable({
            timeoutMsg: 'The MAIN button Lock/Unlock Conversation did not clicable',
        })
        await this.getMainButtonReasonForLocking().click()
    }

    public async selectReasonForLocking(reason: number): Promise<void> {
        await (await this.getReasonForLocking(reason)).waitForDisplayed({
            timeoutMsg: 'The button "Reason for locking" did not displayed',
        })
        await this.getReasonForLocking(reason).click()
    }

    public isLockConversationExist(): Promise<boolean> {
        return this.getTitleCreatedIssue().isExisting()
    }

    public async selectBugButton(): Promise<void> {
        await this.getBugButton().waitForClickable({
            timeoutMsg: 'The button "Bug" did not clicable',
        })
        await this.getBugButton().click()
    }

    public selectIssueId(): Promise<string> {
        return this.getIssueId().getValue()
    }

    public async openLabelsSettingsPopup(): Promise<void> {
        await this.getLabelsSettings().waitForClickable({
            timeoutMsg: 'The button Labels settings did not clicable',
        })
        await this.getLabelsSettings().click()
    }

    public async selectLabelsSettingsBug(): Promise<void> {
        await this.getLabelsSettingsBug().waitForClickable({
            timeoutMsg: 'The button Labels settings - "Bug" did not clicable',
        })
        await this.getLabelsSettingsBug().click()
    }

    public async foundIssue(nameIssue: string): Promise<void> {
        await this.getIssuesSearch().waitForDisplayed({
            timeoutMsg: 'The issues search did not displayed',
        })
        await this.getIssuesSearch().click()
        await this.getIssuesSearch().clearValue()
        await this.getIssuesSearch().setValue(nameIssue)
        await this.browser.keys('Enter')
        await browser.pause(2000)
    }

    public async userSearch(loginUser: string): Promise<void> {//переименовать метод в searchUser()
        await this.getUserSearchField().waitForClickable({
            timeoutMsg: 'The user search did not clicable',
        })
        await this.getUserSearchField().click()
        await this.getUserSearchField().clearValue()
        await this.getUserSearchField().setValue(loginUser)
        await this.browser.keys('Enter')
        await browser.pause(3000)
    }

    public async isExistFoundIssue(issueName: string): Promise<boolean> {
        await this.getFoundIssue(issueName).waitForExist({
            timeoutMsg: 'The issue did not exist',
        })
        return (await this.getFoundIssue(issueName)).isExisting()
    }

    public async isExistSpamTextUnderComment(): Promise<boolean> {
        await this.getSpamTextUnderComment().waitForExist({
            timeoutMsg: 'The massage locked as spam did not exist',
        })
        return (await this.getSpamTextUnderComment()).isExisting()
    }

    public async isExistClosedIssue(): Promise<boolean> {
        await this.getNumberClosedIssues().waitForDisplayed({
            timeoutMsg: 'The number closed issues did not displayed',
        })
        return (await this.getNumberClosedIssues()).isExisting()
    }

    public async isExistMessageDeleteIssue(): Promise<boolean> {
        await this.getDeleteIssueMassage().waitForDisplayed({
            timeoutMsg: 'The message deleted issue did not displayed',
        })
        return (await this.getDeleteIssueMassage()).isExisting()
    }

    public async isUserAssignees(): Promise<boolean> {
        await this.getUserNameAssignees().waitForDisplayed({
            timeoutMsg: 'The user name in assignees did not displayed',
        })
        return (await this.getUserNameAssignees()).isExisting()
    }

    public async isNoAssignees(): Promise<boolean> {
        return (await this.getUserNameAssignees()).isExisting()
    }

    public async selectCheckboxIssue(issueName: string): Promise<void> {
        await this.getCheckboxIssue(issueName).waitForDisplayed({
            timeoutMsg: 'The issue checkbox did not displayed',
        })
        await this.getCheckboxIssue(issueName).click()
    }

    public async selectMarkAsButton(): Promise<void> {
        await this.getMarkAsButton().waitForDisplayed({
            timeoutMsg: 'The button "Mark as" did not displayed',
        })
        await this.getMarkAsButton().click()
    }

    public async selectActionInMarkAsButton(issueStatus: number): Promise<void> {
        await this.getActionInMarkAsButton(issueStatus).waitForClickable({
            timeoutMsg: 'The action in "Mark As" button did not clicable',
        })
        await this.getActionInMarkAsButton(issueStatus).click()
    }

    public async selectDeleteIssueButton(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'The button "Delete issue" did not clicable',
        })
        await this.getDeleteIssueButton().click()
    }

    public async selectDeleteIssueButtonInPopup(): Promise<void> {
        await this.getDeleteIssueButtonInPopup().waitForClickable({
            timeoutMsg: 'The button in popup "Delete this issue" did not clicable',
        })
        await this.getDeleteIssueButtonInPopup().click()
    }

    public async selectAssigneesButton(): Promise<void> {
        await this.getAssigneesButton().waitForClickable({
            timeoutMsg: 'The button Assignees did not clicable',
        })
        await this.getAssigneesButton().click()
        await this.browser.pause(5000)
    }

    public async clearAssignees(): Promise<void> {
        await this.getClearAssignees().waitForClickable({
            timeoutMsg: 'The button "Clear assignees" did not clicable',
        })
        await this.getClearAssignees().click()
        await this.browser.pause(5000)
    }

    private getFoundIssue(issueName: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text() = "${issueName}"]`)
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

    private getCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getCreatedComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "user-select-contain")]//tr[1]//*[contains(@class, "js-comment-body")]')
    }

    private getLockAndUnlockConversation(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]//*[contains(@class, "js-lock-issue")]/summary')
    }

    private getReasonForLocking(reason: number): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@id="unlock-reason"]/option[${reason}]`)
    }

    private getMainButtonReasonForLocking(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="unlock-reason"]')
    }

    private getSaveLockConversationButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]//*[contains(@class, "Box-footer")]/button')
    }

    private getLabelsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="repo-content-turbo-frame"]//div/nav/a[1]')
    }

    private getBugButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="repo-content-pjax-container"]//a[@href="/dbrffrbd/autotest-ips/labels/bug"]')
    }

    private getIssuesSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getIssueId(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]//span[contains(@class, "f1-light")]')
    }

    private getLabelsSettings(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]')
    }

    private getLabelsSettingsBug(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]//label[1]')
    }

    private getSpamTextUnderComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//strong[text() = "spam "]//ancestor::*[contains(@id, "event-")]`)
    }

    private getCheckboxIssue(issueName: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text() = "${issueName}"]/ancestor::*[contains(@id, "issue_")]//input`)
    }

    private getMarkAsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-toolbar"]//*[contains(@data-url, "/dbrffrbd/autotest-ips/issues/show_menu_content?partial=issues%2Ftriage%2Factions_content")]')
    }

    private getActionInMarkAsButton(issueStatus: number): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[contains(@data-url, "/dbrffrbd/autotest-ips/issues/show_menu_content?partial=issues%2Ftriage%2Factions_content")]//*[contains(@action, "/dbrffrbd/autotest-ips/issues/triage")]//button[${issueStatus}]`)
    }

    private getNumberClosedIssues(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@id="js-issues-toolbar"]//a[2][text()[contains(.,'1')]]`)
    }

    private getDeleteIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]//*[contains(@class, "js-delete-issue")]/summary')
    }

    private getDeleteIssueButtonInPopup(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(@name, "verify_delete")]')
    }

    private getDeleteIssueMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]/div')
    }

    private getAssigneesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="assignees-select-menu"]')
    }

    private getUserSearchField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="assignee-filter-field"]')
    }

    private getUserNameAssignees(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]//a[contains(@class, "css-truncate-target")]')
    }

    private getClearAssignees(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="assignees-select-menu"]//*[contains(@class, "btn-block")]')
    }

}

export {
    IssuesPage,
}