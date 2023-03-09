{
    class Car {
        private engineState: string = 'Off'
        public speed: number

        constructor(speed: number) {
            this.speed = speed
        }

        public turnOn(): void {
            this.engineState = 'On'
        }

        public turnOff(): void {
            this.engineState = 'Off'
        }

        public getState(): void {
            console.log(this.engineState)
        }

        public checkAllowableSpeed(): void {
            const allowableSpeed = (this.speed > 0 && this.speed <= 100)
                ? 'Да'
                : 'Машина не зведена, либо скорость недопустима';
            console.log(`Машина имеет допустимую скорость? ${allowableSpeed}`)
        }

        public setSpeed(speed: number): void {
            this.speed = speed
        }
    }

    const car: Car = new Car(80)
    car.turnOn()
    //car.turnOff()
    car.setSpeed(90)
    car.getState()
    car.checkAllowableSpeed()
}
