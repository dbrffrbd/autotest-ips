{
    const ageVerification = (age: number) => {
        const deniedAccess: string = 'Страница недоступна'
        const allowedAccess: string = 'Страница доступна'
        if (age < 18) {
            console.log(deniedAccess)
        } else {
            console.log(allowedAccess)
        }
    }
    const ageHuman: number = 12
    ageVerification(ageHuman)
}