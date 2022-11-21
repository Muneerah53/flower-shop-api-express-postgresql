import supertest from 'supertest';
import { User, UserModel } from '../../models/user';
import app from '../../server';

const request = supertest(app);
const userModel = new UserModel();
let token = '';

describe('Test User endpoint responses', () => {
    const testUser: User = {
        first_name: 'Flora',
        last_name: 'Blume',
        password: 'password123',
    };

    beforeAll(async () => {
        const user = await userModel.create(testUser);
        testUser.id = user.id;
    });

    describe('Test authenticate user endpoint responses', () => {
        it('authenticate should return a token for the valid user', async () => {
            const response = await request
                .post('/users/authenticate')
                .set('Content-Type', 'application/json')
                .send({
                    id: testUser.id,
                    first_name: 'Flora',
                    last_name: 'Blume',
                    password: 'password123',
                });
            expect(response.status).toBe(200);
            token = response.body;
        });

        it('authenticate should fail for the invalid user', async () => {
            const response = await request
                .post('/users/authenticate')
                .set('Content-Type', 'application/json')
                .send({
                    first_name: 'Chloris',
                    last_name: 'Blume',
                    password: 'wrongpassword',
                });
            expect(response.status).toBe(401);
        });
    });

    describe('Test user methods endpoints responses', () => {
        it('endpoint should create a new user', async () => {
            const response = await request
                .post('/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    first_name: 'Ella',
                    last_name: 'Musk',
                    password: 'test123',
                });
            expect(response.status).toBe(200);
            const { first_name, last_name } = response.body;
            expect(first_name).toEqual('Ella');
            expect(last_name).toEqual('Musk');
        });
        it('endpoint should show a list of all users', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.length).toBeTruthy();
        });
        it('endpoint should show the user info', async () => {
            const response = await request
                .get(`/users/${testUser.id!}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const { first_name, last_name } = response.body;
            expect(first_name).toEqual(testUser.first_name);
            expect(last_name).toEqual(testUser.last_name);
        });
    });
});
