// const groupStudents: { name: string, age: number }[] = [
//     { name: 'Оля', age: 19 },
//     { name: 'Женя', age: 20 },
//     { name: 'Кирилл', age: 21 },
//     { name: 'Нина', age: 18 }
// ]

type Student = {
    name: string
    age: number
}

const groupStudents: Student[] = [
    { name: 'Оля', age: 19 },
    { name: 'Женя', age: 20 },
    { name: 'Кирилл', age: 21 },
    { name: 'Нина', age: 18 }
]

groupStudents.forEach((student: Student) => {
    console.log(`Имя студента: | Возраст:`)
    console.log(`${student.name}  |  ${student.age}`)
})