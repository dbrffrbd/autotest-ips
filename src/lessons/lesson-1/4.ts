{
    const ageHuman: number = 25
    const noAccess: string = 'Страница недоступна'
    const yesAccess: string = 'Страница доступна'
    const ageVerification: string = ageHuman < 18 ? noAccess : yesAccess
    console.log(ageVerification)
}