import supertest from 'supertest';
import { User, UserModel } from '../../models/user';
import app from '../../server';
import { Flower, FlowerModel } from '../../models/flower';

const request = supertest(app);
const userModel = new UserModel();
const flowerModel = new FlowerModel();
var token = '';

describe('Test Flower endpoints responses', () => {
    const testFlower: Flower = {
        name: 'Hydrangea',
        color: 'Blue',
        price: 120,
    };

    const flowerUser: User = {
        first_name: 'Test',
        last_name: 'User',
        password: 'password123',
    };

    describe('Initialize token', () => {
        it('should create user', async () => {
            const user = await userModel.create(flowerUser);
            flowerUser.id = user.id;
            expect(user.first_name).toEqual(flowerUser.first_name);
            expect(user.last_name).toEqual(flowerUser.last_name);
        });

        it('should authenticate user', async () => {
            const response = await request
                .post('/users/authenticate')
                .set('Content-Type', 'application/json')
                .send(flowerUser);
            expect(response.status).toBe(200);
            token = response.body;
        });

    });

    describe('Test Flower methods endpoints responses', () => {
        it('endpoint should create a new flower', async () => {
            const response = await request
                .post('/flowers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(testFlower);
            expect(response.status).toBe(200);
            const { name, color, price } = response.body;
            expect(name).toEqual('Hydrangea');
            expect(color).toEqual('Blue');
            expect(price).toEqual(120);
            testFlower.id = response.body.id;
        });
        it('endpoint should show a list of all flowers', async () => {
            const response = await request.get('/flowers');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeTruthy();
        });
        it('endpoint should show the flower info', async () => {
            const response = await request.get(`/flowers/${testFlower.id!}`);
            expect(response.status).toBe(200);
            const { name, color, price } = response.body;
            expect(name).toEqual(testFlower.name);
            expect(color).toEqual(testFlower.color);
            expect(price).toEqual(testFlower.price);
        });
        it('find by color endpoint should show the blue flowers', async () => {
            const response = await request.get('/flowers/color/Blue');
            expect(response.status).toBe(200);
            expect(response.body).toContain(testFlower);
        });
        it('endpoint should update the flower', async () => {
            const response = await request
                .put(`/flowers/${testFlower.id!}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'French Hydrangea',
                    color: 'Purple',
                    price: 150,
                });
            expect(response.status).toBe(200);
            const { name, color, price } = response.body;
            expect(name).toEqual('French Hydrangea');
            expect(color).toEqual('Purple');
            expect(price).toEqual(150);
        });

        it('endpoint should delete the flower', async () => {
            const response = await request
                .delete(`/flowers/${testFlower.id!}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const { name, color, price } = response.body;
            expect(name).toEqual('French Hydrangea');
            expect(color).toEqual('Purple');
            expect(price).toEqual(150);
        });
    });
});
