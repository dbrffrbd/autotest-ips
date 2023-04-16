import { LoginPage } from '../page-object/Login.page'
import { PublicProfile } from '../page-object/PublicProfile.page'
import { UserProfile } from '../page-object/UserProfile.page'
import { UserModel, createUserModel } from '../model/user.model'
import { PronounsType, UserData, userData } from '../data/user.data'
import { EMPTY_VALUE } from '../../../common/data/tests.data'
import { UserAPIService, UserResponse } from '../../../common/api/api-service/UserAPIService'
import { AxiosResponse } from 'axios'
import { emptyData } from "../../user/data/user.data"
import { MainPage } from '../page-object/Main.page'

describe('Public profile', () => {
    let loginPage: LoginPage
    let publicProfile: PublicProfile
    let userProfile: UserProfile
    const user: UserModel = createUserModel(userData)
    const emptyUser: UserModel = createUserModel(emptyData)

    before(async () => {
        loginPage = new LoginPage(browser)
        publicProfile = new PublicProfile(browser)
        userProfile = new UserProfile(browser)
        const mainPage = new MainPage(browser)

        await loginPage.open()
        await loginPage.login(user)
        await mainPage.openUserMenu()

        await publicProfile.open()
        await publicProfile.selectPronoun(PronounsType.NOTSPECIFY)
        await publicProfile.savePublicProfileChanges()
    })

    beforeEach(async () => {
        await publicProfile.open()
        await UserAPIService.updateAuthenticatedUser(emptyUser)
    })

    it('User should change and save name', async () => {
        await publicProfile.setUserName(user.name)
        await publicProfile.savePublicProfileChanges()
        await userProfile.open()

        expect(await userProfile.selectUserName()).toEqual(user.name)
    })

    it('User should save an empty name', async () => {
        await publicProfile.setUserName(EMPTY_VALUE)
        await publicProfile.savePublicProfileChanges()
        await userProfile.open()
        await userProfile.openEditProfile()

        expect(await userProfile.selectUserName()).toEqual(EMPTY_VALUE)
    })

    it('The field Public Email should not be clickable', async () => {
        expect(await publicProfile.isFieldLock()).toEqual(false)
    })


    it('Long bio text should be cut and save', async () => {
        const longTextBio: string = `${user.textBio}а`
        await publicProfile.setBio(longTextBio)
        await publicProfile.savePublicProfileChanges()
        await userProfile.open()

        expect(await userProfile.getUserBioСontents()).toEqual(user.textBio)
    })

    it('User pronoun should be equal value she/her', async () => {
        await publicProfile.selectPronoun(user.pornoun) //
        await publicProfile.savePublicProfileChanges()
        await userProfile.open()

        expect(await userProfile.isExistPronouns()).toEqual(true)
    })

    it('Photo should be uploaded in profile', async () => {
        await publicProfile.uploadFile(user.avatar)
        await browser.pause(2000)

        expect(await publicProfile.isMessagePicture()).toEqual(true)
    })

    afterEach(async () => {
        await UserAPIService.updateAuthenticatedUser(emptyUser)
    })

})