{
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('reject')
        }, 100)
    })

    async function print(): Promise<void> {
        try {
            console.log('!!!Выполнено успешно (Fulfilled):', await promise)
        } catch (err) {
            console.log('!!!Выполнено с ошибкой (Rejected):', err)
        }
    }
    print()
}