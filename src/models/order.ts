import db from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: string;
};

export class OrderModel {
    async index(uid: string): Promise<Order[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) ';

            const result = await conn.query(sql, [uid]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: string, uid: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';
            const conn = await db.connect();

            const result = await conn.query(sql, [id, uid]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = await db.connect();

            const result = await conn.query(sql, [o.status, o.user_id]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const conn = await db.connect();
            const sql =
                'UPDATE orders SET status= ($1) WHERE id=($2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update order ${o.id}. Error: ${error}`);
        }
    }
    async addFlower(
        quantity: number,
        orderId: string,
        flowerId: string
    ): Promise<Order> {
        try {
            const sql =
                'INSERT INTO order_flowers (quantity, order_id, flower_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await db.connect();

            const result = await conn.query(sql, [quantity, orderId, flowerId]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {

            throw new Error(
                `Could not add flower ${flowerId} to order ${orderId}: ${err}`
            );
        }
    }

    async showUserOrder(uid: string): Promise<Order> {
        try {
            const sql =
                "SELECT * FROM orders WHERE user_id=($1) AND status ='Active'";
            const conn = await db.connect();

            const result = await conn.query(sql, [uid]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not find order by user ${uid}. Error: ${err}`
            );
        }
    }
    async completedOrders(uid: string): Promise<Order[]> {
        try {
            const conn = await db.connect();
            const sql = `SELECT id
             FROM orders
             WHERE user_id = ($1) AND STATUS = 'Complete'`;
            const result = await conn.query(sql, [uid]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get orders: ${err}`);
        }
    }
}
