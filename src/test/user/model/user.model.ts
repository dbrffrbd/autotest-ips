import { PronounsType, UserData } from '../data/user.data'

type UserModel = {
    login: string,
    password: string,
    email: string,
    name: string,
    textBio: string,
    pornoun: PronounsType,
    avatar: string,
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.login,
        password: data.password,
        email: data.email,
        name: data.name,
        textBio: data.textBio,
        pornoun: data.pornoun,
        avatar: data.avatar,
    }
}

export {
    UserModel,
    createUserModel,
}