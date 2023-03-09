{
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve')
        }, 1000)
    })

    async function print(): Promise<void> {
        console.log('!!!Выполнено успешно (Fulfilled):', await promise)
    }
    print()
}