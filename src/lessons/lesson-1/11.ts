{
    const sum = function (a: number, b: number):void {
        console.log(`Сумма ${a} и ${b} равна ${a + b}`)
    }

    const subtraction = function (a: number, b: number):void {
        console.log(`Разница ${a} и ${b} равна ${a - b}`)
    }

    const multiplication = function (a: number, b: number):void {
        console.log(`Умножение ${a} и ${b} равно ${a * b}`)
    }

    const division = function (a: number, b: number):void {
        if (b === 0) {
            console.log('На ноль делить нельзя')
            return
        }

        console.log(`Деление ${a} и ${b} равно ${a / b}`)
    }

    let calc = function (c: number, d: number, callbackFunction: Function):void {
        callbackFunction(c, d)
    }

    const firstVariable: number = 8
    const secondVariable: number = 0
    
    calc(firstVariable, secondVariable, sum)
    calc(firstVariable, secondVariable, subtraction)
    calc(firstVariable, secondVariable, multiplication)
    calc(firstVariable, secondVariable, division)
}