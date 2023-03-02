let temperature: number = 25
const veryCold: string = 'Очень холодно'
const cold: string = 'Холодно'
const chilly: string = 'Прохладно'
const wharm: string = 'Тепло'
const hot: string = 'Жарко'
if (temperature < -10) {
    console.log(veryCold)
} else if (temperature >= -10 && temperature < 10) {
    console.log(cold)
} else if (temperature >= 10 && temperature < 18) {
    console.log(chilly)
} else if (temperature >= 18 && temperature < 25) {
    console.log(wharm)
} else if (temperature >= 25) {
    console.log(hot)
}