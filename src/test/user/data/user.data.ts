import { LOGIN, EMAIL, PASSWORD } from "../../../../credentials"
import { getRandomString, getRandomInteger, getTime } from "../../../common/data/tests.data"

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
    name: `Вика-${getRandomString(getRandomInteger(1, 243))}-${getTime()}`,
    textBio: `Bio-${getRandomString(getRandomInteger(143, 143))}-${getTime()}`,
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

