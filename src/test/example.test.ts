import { AxiosResponse } from "axios"
import { UserAPIService, UserResponse } from "../common/api/api-service/UserAPIService"
import { emptyData } from "./user/data/user.data"
import { UserModel, createUserModel } from "./user/model/user.model"

describe('test describe', () => {
    it('test it', async () => {
        async function open() {
            await browser.url(`http://github.com`)
        }
        const user: UserModel = createUserModel(emptyData)
        const response: AxiosResponse<UserResponse> = await UserAPIService.updateAuthenticatedUser(user)
        console.log(response.data)
        await open()
    })
})
//коммент
