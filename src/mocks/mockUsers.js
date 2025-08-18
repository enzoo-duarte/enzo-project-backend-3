import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

export const generateUsers = (cantidad = 50) => {
    const users = [];
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    for (let i = 0; i < cantidad; i++) {
        const user = {
            _id: faker.database.mongodbObjectId(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        };
        users.push(user);
    }

    return users;
};

export const generateMockData = async (userQty = 10, petQty = 10) => {
    const hashedPassword = bcrypt.hashSync('coder123', 10);
    const users = [];

//Generar usuarios
    for (let i = 0; i < userQty; i++) {
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: 'user',
            pets: []
        });
    }

    const createdUsers = await User.insertMany(users);

//Generar mascotas y asignar dueño (user) aleatorio
    const pets = [];
    for (let i = 0; i < petQty; i++) {
        const randomUser = faker.helpers.arrayElement(createdUsers);

        const pet = {
            name: faker.animal.dog(),
            specie: 'dog',
            birthDate: faker.date.birthdate({ min: 1, max: 10, mode: 'age' }),
            adopted: true,
            owner: randomUser._id,
            image: faker.image.urlPicsumPhotos()
        };

        pets.push(pet);
    }

    const createdPets = await Pet.insertMany(pets);

// Asociar mascotas a sus dueños
    for (const pet of createdPets) {
        const owner = createdUsers.find(user => user._id.equals(pet.owner));
        if (owner) {
            owner.pets.push(pet._id);
        }
    }

    await Promise.all(createdUsers.map(user => user.save()));

    return {
        usersCreated: createdUsers.length,
        petsCreated: createdPets.length
    };
};