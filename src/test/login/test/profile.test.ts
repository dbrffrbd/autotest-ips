import { LoginPage } from '../page-object/Login.page'
import { LOGIN, EMAIL, PASSWORD } from "../../../../credentials"
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
    })

    it('Save valid name in field "Name"', async () => {
        const NAME: string = 'Vika'
        await loginPage.login(LOGIN, PASSWORD)

        await publicProfile.saveName(NAME)

        await userProfile.openUserProfile()
        expect(await userProfile.getUserNameText()).toEqual(NAME)
    })

    it('Email input filed disabled', async () => {
        await loginPage.login(LOGIN, PASSWORD)
        publicProfile.getPublicEmail().isFocused()
        expect(await publicProfile.getPublicEmail().isClickable()).toEqual(false)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
