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
        await userProfile.openUserProfile()

        expect(await userProfile.getUserNameText()).toEqual(name)
    })

    it('The field Public Email should not be clickable', async () => {
        expect(await publicProfile.checkingFieldLock()).toEqual(false)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
