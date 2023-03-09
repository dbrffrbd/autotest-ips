{
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('reject')
        }, 100)
    })

    promise.then(
        value => console.log('Выполнено успешно (Fulfilled):', value),
        error => console.log('Выполнено с ошибкой (Rejected):', error)
    )
}