import supertest from 'supertest';
import app from '../../server';
import { User, UserModel } from '../../models/user';
import { Order } from '../../models/order';
import { Flower, FlowerModel } from '../../models/flower';

const request = supertest(app);
const userModel = new UserModel();
const flowerModel = new FlowerModel();
var token = '';
var route = '';

describe('Test Order endpoints responses', () => {
    const testOrder: Order = {
        status: 'Active',
        user_id: '1',
    };

    const orderFlower: Flower = {
        name: 'Magnolia',
        color: 'White',
        price: 100,
    };

    const orderUser: User = {
        first_name: 'Test',
        last_name: 'User',
        password: 'password123',
    };

    describe('Initialize flower and token', () => {
        it('should create flower for order', async () => {
            const f = await flowerModel.create(orderFlower);
            orderFlower.id = f.id;
            expect(f).toEqual(orderFlower);
        });

        it('should create user for order', async () => {
            const user = await userModel.create(orderUser);
            orderUser.id = user.id;
            expect(user.first_name).toEqual(orderUser.first_name);
            expect(user.last_name).toEqual(orderUser.last_name);
        });

        it('should authenticate user', async () => {
            const response = await request
                .post('/users/authenticate')
                .set('Content-Type', 'application/json')
                .send(orderUser);
            expect(response.status).toBe(200);
            token = response.body;
        });

        afterAll(() => {
            testOrder.user_id = orderUser.id!.toString();
            route = `/users/${testOrder.user_id}/orders`;
        });
    });

    describe('Test Order methods endpoints responses', () => {
        it('endpoint should create a new order', async () => {
            const response = await request
                .post(route)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            const { status, user_id } = response.body;
            expect(status).toEqual(testOrder.status);
            expect(user_id).toEqual(testOrder.user_id);
            testOrder.id = response.body.id;
        });
        it('endpoint should show a list of all orders', async () => {
            const response = await request
                .get(route)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toContain(testOrder);
        });
        it('endpoint should show the order info', async () => {
            const response = await request
                .get(`${route}/${testOrder.id!}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const { status, user_id } = response.body;
            expect(status).toEqual(testOrder.status);
            expect(user_id).toEqual(testOrder.user_id);
        });
        it('endpoint should add flower to order', async () => {
            const response = await request
                .post(`${route}/${testOrder.id!}/flowers`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    quantity: 1,
                    flowerID: orderFlower.id,
                });
            expect(response.status).toBe(200);
            const { quantity, order_id, flower_id } = response.body;
            expect(quantity).toEqual(1);
            expect(order_id).toEqual(testOrder.id!.toString());
            expect(flower_id).toEqual(orderFlower.id!.toString());
        });

        it('endpoint should show the current order', async () => {
            const response = await request
                .get(`${route}/show/current-order`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const { id } = response.body;
            expect(id).toEqual(testOrder.id);
        });

        it('endpoint should update status of order', async () => {
            const response = await request
                .put(`${route}/${testOrder.id!}/complete`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            const { id, status, user_id } = response.body;
            expect(id).toEqual(testOrder.id);
            expect(status).toEqual('Complete');
            expect(user_id).toEqual(testOrder.user_id);
        });

        it('endpoint should show the completed orders', async () => {
            const response = await request
                .get(`${route}/show/history`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toContain({ id: testOrder.id });
        });
    });

    describe('Test Dashboard method endpoints responses', () => {
        it('endpoint should show the cart of the order', async () => {
            const response = await request
                .get(`/cart/${testOrder.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });

        it('endpoint should show the most popular flower', async () => {
            const response = await request.get('/five-most-popular');
            expect(response.status).toBe(200);
            expect(response.body).toContain({
                flower_id: orderFlower.id?.toString(),
                sum: '1',
            });
        });
    });
});
