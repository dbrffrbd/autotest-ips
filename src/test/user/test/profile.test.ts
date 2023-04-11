import { LoginPage } from '../page-object/Login.page'
import { PublicProfile } from '../page-object/PublicProfile.page'
import { UserProfile } from '../page-object/UserProfile.page'
import { UserModel, createUserModel } from '../model/user.model'
import { PronounsType, UserData, userData } from '../data/user.data'
import { EMPTY_VALUE } from '../../../common/data/tests.data'

describe('Public profile', () => {
    let loginPage: LoginPage
    let publicProfile: PublicProfile
    let userProfile: UserProfile
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        publicProfile = new PublicProfile(browser)
        userProfile = new UserProfile(browser)

        await loginPage.open()
        await loginPage.setLogin(user.email)
        await loginPage.setPassword(user.password)
        await loginPage.login()
        await browser.pause(8000)

        await publicProfile.open()
        await publicProfile.selectPronoun(PronounsType.NOTSPECIFY)
        await publicProfile.savePublicProfileChanges()
    })

    beforeEach(async () => {
        await publicProfile.open()
    })

    it('User should be change and save name', async () => {
        await publicProfile.setUserName(user.name)
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()

        expect(await userProfile.getUserNameСontents()).toEqual(user.name)
    })

    it('User must save an empty name', async () => {
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()
        await userProfile.openEditProfile()

        // проверить существование элемента, не заходя в настройки (isExist(false)). Те дождать загрузки элемента и проверить ГОТОВО
        //БЫЛО: expect(await userProfile.getValueInFieldName()).toEqual(EMPTY_VALUE)
        expect(await userProfile.isNoUserName()).toEqual(true)
    })

    it('The field Public Email should not be clickable', async () => {
        expect(await publicProfile.checkingFieldLock()).toEqual(false)
    })

    it('User should be change and save long invalid text in Bio', async () => {
        const longTextBio: string = `${user.textBio}а`
        await publicProfile.setBio(longTextBio)
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()

        expect(await userProfile.getUserBioСontents()).toEqual(user.textBio)
    })

    it('User must save pronouns she/her', async () => {
        //метод не универсальный ГОТОВО
        await publicProfile.selectPronoun(user.pornoun) //подготовить аккаунт к нужному состоянию (ДОБАВИТЬ В Before выключение выбранного местоимения) ГОТОВО
        await publicProfile.savePublicProfileChanges()
        await userProfile.open()

        expect(await userProfile.isExistPronouns()).toEqual(true)
    })

    it('Photo should be uploaded in profile', async () => {
        await publicProfile.uploadFile(user.avatar)
        await browser.pause(2000)

        expect(await publicProfile.checkMassagePicture()).toEqual(true)
    })

})