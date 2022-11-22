import db from '../database';

export class DashboardQueries {
    async fiveMostPopular(): Promise<{ name: string; count: number }[]> {
        try {
            const conn = await db.connect();
            const sql = `SELECT flower_id, SUM(quantity)
            FROM flowers JOIN order_flowers ON flowers.id = order_flowers.flower_id
            GROUP BY flower_id
            ORDER BY SUM(quantity) DESC LIMIT 5`;

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`unable get flowers by popularity: ${error}`);
        }
    }

    async orderCart(
        orderID: string
    ): Promise<
        { name: string; price: number; color: string; quanitity: number }[]
    > {
        try {
            const conn = await db.connect();
            const sql = `SELECT name, price, color, quantity
             FROM ((flowers JOIN order_flowers ON flowers.id = order_flowers.flower_id)
             JOIN orders on orders.id=order_flowers.order_id)
             WHERE orders.id = ($1)`;

            const result = await conn.query(sql, [orderID]);

            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`unable get flowers and orders: ${error}`);
        }
    }
}
