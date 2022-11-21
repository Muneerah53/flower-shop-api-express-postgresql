import db from '../database';

export type Flower = {
    id?: number;
    name: string;
    price: number;
    color: string;
};

export class FlowerModel {
    async index(): Promise<Flower[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM flowers';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Could not get flowers. Error: ${error}`);
        }
    }

    async show(id: string): Promise<Flower> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM flowers WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get flower ${id}. Error: ${error}`);
        }
    }

    async create(f: Flower): Promise<Flower> {
        try {
            const conn = await db.connect();
            const sql =
                'INSERT INTO flowers (name, price, color) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [f.name, f.price, f.color]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add flower ${f.name}. Error: ${error}`);
        }
    }

    async update(f: Flower): Promise<Flower> {
        try {
            const conn = await db.connect();
            const sql =
                'UPDATE flowers SET name= ($1), price = ($2), color = ($3) WHERE id=($4) RETURNING *';
            const result = await conn.query(sql, [
                f.name,
                f.price,
                f.color,
                f.id,
            ]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update flower ${f.id}. Error: ${error}`);
        }
    }

    async delete(id: string): Promise<Flower> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM flowers WHERE id = ($1)  RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete flower ${id}. Error: ${error}`);
        }
    }

    async flowersByColor(color: string): Promise<Flower[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM flowers WHERE color = ($1)';
            const result = await conn.query(sql, [color]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(
                `Could not find a flower with color ${color}. Error: ${error}`
            );
        }
    }
}
