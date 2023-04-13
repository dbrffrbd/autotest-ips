import { UserModel } from '../../../test/user/model/user.model'

type UpdateUserRequest = {
    name: string,
    bio: string,
}

class UserAPIDataProvider {
    public static getUpdatedUserData(user: UserModel): UpdateUserRequest {
        return {
            name: user.name,
            bio: user.textBio,
        }
    }
}

export {
    UserAPIDataProvider,
    UpdateUserRequest,
}