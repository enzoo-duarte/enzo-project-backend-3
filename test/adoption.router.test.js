import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app.js';
import UserModel from '../src/dao/models/User.js';
import { faker } from '@faker-js/faker';

dotenv.config();

const expect = chai.expect;
const request = supertest(app);

//ObjectId válido para el formato de MongoDB 
const fakeObjectId = (id = '652ebc184287d9b72e9b2aaa') => new mongoose.Types.ObjectId(id);

// Acá uso uno real para que pase el test del usuario existente
const dummyUserId = fakeObjectId('652ebc184287d9b72e9b2aac');

describe('Functional Tests', function () {
    this.timeout(5000); // Esto se ajustó así porque el before tardaba más de la cuenta

    before(async function () {
        await mongoose.connect(process.env.MONGO_URI);

// Creación del usuario dummy para los tests
        await UserModel.create({
            _id: dummyUserId,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'user'
        });
    });

    after(async function () {

// Se elimina el user después del test
        await UserModel.findByIdAndDelete(dummyUserId);
        await mongoose.connection.close();
    });

    describe('GET /api/adoptions', function () {
        it('devuelve todas las adopciones (status 200)', async function () {
            const response = await request.get('/api/adoptions');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload').that.is.an('array');
        });
    });

    describe('GET /api/adoptions/:aid', function () {
        it('si la adopción no existe devuelve 404', async function () {
            const fakeId = fakeObjectId();
            const response = await request.get(`/api/adoptions/${fakeId}`);
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error').that.includes('Adoption');
        });
    });

    describe('POST /api/adoptions/:uid/:pid', function () {
        it('si el usuario no existe devuelve 404', async function () {
            const nonExistentUser = fakeObjectId('652ebc184287d9b72e9b2aaa');
            const dummyPetId = fakeObjectId('652ebc184287d9b72e9b2aab');

            const response = await request.post(`/api/adoptions/${nonExistentUser}/${dummyPetId}`);
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error').that.includes('user');
        });

        it('si la mascota no existe devuelve 404', async function () {
            const nonExistentPet = fakeObjectId('652ebc184287d9b72e9b2aad');

            const response = await request.post(`/api/adoptions/${dummyUserId}/${nonExistentPet}`);
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error').that.includes('Pet');
        });
    });
});