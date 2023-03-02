const age: number = 15
const deniedAccess: string = 'Страница недоступна'
const allowedAccess: string = 'Страница доступна'
if (age < 18) {
    console.log(deniedAccess)
} else {
    console.log(allowedAccess)
}