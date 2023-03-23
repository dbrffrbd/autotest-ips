import { LoginPage } from '../page-object/Login.page'
import { LOGIN, PASSWORD } from "../../../../credentials"
import { PublicProfile } from '../page-object/PublicProfile.page'
import { UserProfile } from '../page-object/UserProfile.page'

describe('Public profile', () => {
    let loginPage: LoginPage
    let publicProfile: PublicProfile
    let userProfile: UserProfile

    before(async () => {
        loginPage = new LoginPage(browser)
        publicProfile = new PublicProfile(browser)
        userProfile = new UserProfile(browser)
    })

    beforeEach(async () => {
        await publicProfile.open()
        await loginPage.login(LOGIN, PASSWORD)
    })

    it('User should be change and save name', async () => {
        const name = 'Vika'
        await publicProfile.setUserName(name)
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()
        await userProfile.chekingUserProfileName()

        expect(await userProfile.getUserNameText()).toEqual(name)
    })

    it('User must save an empty name', async () => {
        const name = ''
        await publicProfile.setUserName(name)
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()
        await userProfile.openEditProfile()

        expect(await userProfile.getValueInFieldName()).toEqual(name)
    })

    it('The field Public Email should not be clickable', async () => {
        expect(await publicProfile.checkingFieldLock()).toEqual(false)
    })

    it('User should be change and save long invalid text in Bio', async () => {
        const textBio = 'Играет значение административных деятельности позволяет роль высшего значение и требуют в важную интересный постоянный представляет способствует сфера а что прак'
        const validTextBio = 'Играет значение административных деятельности позволяет роль высшего значение и требуют в важную интересный постоянный представляет способствует сфера а что пра'
        await publicProfile.setBio(textBio)
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()
        await userProfile.chekingUserProfileBio()

        expect(await userProfile.getUserBioText()).toEqual(validTextBio)
    })

    it('User must save pronouns she/her', async () => {
        const she = 'she/her'
        await publicProfile.selectPronounsShe()
        await publicProfile.savePublicProfileChanges()
        await publicProfile.viewProfile()

        expect(await userProfile.getValueUserPronouns()).toEqual(she)
    })

    it('Photo should be uploaded in profile', async () => {
        const filePath = 'src/files/cat.jpg'
        await publicProfile.uploadFile(filePath)
        await browser.pause(10000)

        expect(await publicProfile.cheackMassagePicture()).toEqual(true)
    })
})

afterEach(async () => {
    await browser.reloadSession()
})
