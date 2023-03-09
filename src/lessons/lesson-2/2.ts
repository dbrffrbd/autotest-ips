{
    const priceCookies: number[] = [50, 60, 70, 88]
    console.log('старая цена - новая цена')

    const printPrices = function (priceCooke: number) {
        console.log(`${priceCooke} руб. - ${priceCooke * 1.2} руб.`)
    }

    priceCookies.forEach((priceCooke: number) => {
        printPrices(priceCooke)
    })
}