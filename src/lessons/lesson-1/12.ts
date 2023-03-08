const printNumbers = function () {
    let num: number = 0
    let evenNumbersArray: number[] = []
    let oddNumbersArray: number[] = []
    while (num < 100) {
        if (num % 2 == 0) {
            evenNumbersArray.push(num)
        }
        if (num % 2 == 1) {
            oddNumbersArray.push(num)
        }
        num++
    }
    console.log(evenNumbersArray)
    console.log(oddNumbersArray)
}

printNumbers()