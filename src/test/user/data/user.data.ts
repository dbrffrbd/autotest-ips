import { LOGIN, EMAIL, PASSWORD } from "../../../../credentials"

type UserData = {
    login: string,
    password: string,
}

const userData: UserData = {
    login: LOGIN,
    password: PASSWORD
}

export {
    UserData,
    userData
}