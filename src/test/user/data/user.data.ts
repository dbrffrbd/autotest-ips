import { LOGIN, EMAIL, PASSWORD } from "../../../../credentials"

enum PronounsType {
    NOTSPECIFY = 1,
    THEY = 2,
    SHE = 3,
    HE = 4,
    CUSTIOM = 5,
}

type UserData = {
    login: string,
    password: string,
    email: string,
    name: string,
    textBio: string,
    pornoun: PronounsType,
    avatar: string,
}

const userData: UserData = {
    login: LOGIN,
    password: PASSWORD,
    email: EMAIL,
    name: 'Vika',
    textBio: 'Играет значение административных деятельности позволяет роль высшего значение и требуют в важную интересный постоянный представляет способствует сфера а что пра',
    pornoun: PronounsType.SHE,
    avatar: 'src/files/cat.jpg',
}

const INVALID_EMAIL = '@123'

export {
    UserData,
    userData,
    PronounsType,
    INVALID_EMAIL,
}