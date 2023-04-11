const EMPTY_VALUE = ''

function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getTime(): number {
    let nowTime = new Date().getTime()
    return nowTime
}

function getRandomString(length: number): string {
    let result = ''
    const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЩШЪЬЫЭЮЯабвгдеёжзийклмнопрстуфхцщшъьыэюя0123456789'
    const charactersLength = characters.length;
    let counter = 0
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result
}

export {
    EMPTY_VALUE,
    getTime,
    getRandomString,
    getRandomInteger,
}
