class Car {
    private engine: string = 'Off'

    public turnOn(): void {
        this.engine = 'On'
    }

    public turnOff(): void {
        this.engine = 'Off'
    }

    public getState(): void {
        console.log(this.engine)
    }
}

const car: Car = new Car()
car.turnOn()
// car.turnOff() 
car.getState()
