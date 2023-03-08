const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve')
    }, 1000)
})

promise.then(
    value => console.log('Выполнено успешно (Fulfilled):', value)
)