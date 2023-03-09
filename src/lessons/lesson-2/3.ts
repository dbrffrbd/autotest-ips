{
    type Cat = {
        name: string,
        age: number,
        breed: string,
        gender: string
    }

    const cat: Cat = { 
        name: 'Мурка', 
        age: 3, 
        breed: 'британский', 
        gender: 'женский' 
    }

    console.log(`Имя питомца: ${cat.name}`)
    console.log(`Возраст: ${cat.age}`)
    console.log(`Порода: ${cat.breed}`)
    console.log(`Пол: ${cat.gender}`)
}