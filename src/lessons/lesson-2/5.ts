class Car {
    private engine: string = 'Off'
    public turnOn() {
        this.engine = 'On'
    }
    public turnOff() {
        this.engine = 'Off'
    }
    public getState() {
        console.log(this.engine)
    }
}

const car: Car = new Car()
car.turnOn()
// car.turnOff() 
car.getState()
