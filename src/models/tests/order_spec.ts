import { Order, OrderModel } from '../order';
import { User, UserModel } from '../user';

const orderModel = new OrderModel();

describe('Test Order Model', () => {
    describe('Test if Order Model methods exist', () => {
        it('should have an index method', () => {
            expect(orderModel.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(orderModel.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(orderModel.create).toBeDefined();
        });

        it('should have a update method', () => {
            expect(orderModel.update).toBeDefined();
        });

        it('should have an add flower method', () => {
            expect(orderModel.addFlower).toBeDefined();
        });

        it('should have a show completed orders method', () => {
            expect(orderModel.completedOrders).toBeDefined();
        });
        it('should have a show users orders method', () => {
            expect(orderModel.showUserOrder).toBeDefined();
        });
    });

    describe('Test Order Model logic', () => {
        const order: Order = {
            status: 'Active',
            user_id: '1',
        };

        beforeAll(async () => {
            const orderUser: User = {
                first_name: 'User',
                last_name: 'Test',
                password: 'password123',
            };

            const userModel = new UserModel();
            const result = await userModel.create(orderUser);
            order.user_id = result.id!.toString();
        });

        it('create method should add an order', async () => {
            const result = await orderModel.create(order);
            order.id = result.id!;
            expect(result).toEqual({
                id: order.id,
                status: order.status,
                user_id: order.user_id,
            });
        });

        it('index method should return a list of orders', async () => {
            const result = await orderModel.index(order.user_id);
            expect(result).toEqual([
                {
                    id: order.id!,
                    status: order.status,
                    user_id: order.user_id,
                },
            ]);
        });

        it('show method should return the correct order', async () => {
            const result = await orderModel.show(order.id!.toString(), order.user_id);
            expect(result).toEqual({
                id: order.id!,
                status: order.status,
                user_id: order.user_id,
            });
        });

        it('show users orders method should return the current order', async () => {
            const result = await orderModel.showUserOrder(order.user_id);

            expect(result).toEqual({
                id: order.id!,
                status: order.status,
                user_id: order.user_id,
            });
        });

        it('update method should update the order status', async () => {
            const updatedOrder: Order = {
                id: order.id!,
                status: 'Complete',
                user_id: order.user_id,
            };

            const result = await orderModel.update(updatedOrder);

            expect(result).toEqual({
                id: order.id!,
                status: 'Complete',
                user_id: order.user_id,
            });
        });

        it('completed orders method should return a list of order', async () => {
            const result = await orderModel.completedOrders(order.user_id);
            expect(result[0].id).toEqual(order.id!);
        });
    });
});
