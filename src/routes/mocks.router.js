import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers, generateMockData } from '../mocks/mockUsers.js'; 

const router = Router();

// Utilidad para generar una mascota falsa
const generatePet = () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(), // alternativa por no aceptar el faker.animal.name
    species: faker.animal.type(),
    birthDate: faker.date.past(),
    adopted: false,
    owner: null
});

// Endpoint: /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
    const pets = [];

    for (let i = 0; i < 100; i++) {
        pets.push(generatePet());
    }

    res.json({ status: 'success', pets });
});

// Endpoint: /api/mocks/mockingusers
router.get('/mockingusers', (req, res) => {
    const { cantidad = 50 } = req.query;
    const users = generateUsers(parseInt(cantidad));
    res.json({ status: 'success', users });
});

//Endpoint: /api/mocks/generateData
router.post('/generateData', async (req, res) => {
    try {
        const { users = 10, pets = 10 } = req.body;

        const result = await generateMockData(users, pets);

        res.status(201).json({
            status: 'success',
            message: `${result.usersCreated} users and ${result.petsCreated} pets were successfully created.`,
            result
        });
    } catch (error) {
        console.error('Error generating mock data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
});

export default router;