import { AxiosResponse } from "axios";
import { UserModel } from "../../../test/user/model/user.model";
import { UserAPIProvider } from "../api-provider/UserAPIProvider";
import { UpdateUserRequest, UserAPIDataProvider } from "../api-data.provider/UserAPIDataProvider";

type UserResponse = {
    login: string,
    html_url: string
}

class UserAPIService {
    public static async updateAuthenticatedUser(
        user: UserModel,
    ): Promise<AxiosResponse<UserResponse>> {
        try {
            const data: UpdateUserRequest = UserAPIDataProvider.getUpdatedUserData(user)
            const userAPIProvider: UserAPIProvider = new UserAPIProvider()
            const response: AxiosResponse<UserResponse> = await userAPIProvider.updateAuthenticatedUser(data)
            return response
        } catch (error) {
            throw new Error(`Update user by model failed ${error}`)
        }
    }
}

export {
    UserAPIService,
    UserResponse,
}