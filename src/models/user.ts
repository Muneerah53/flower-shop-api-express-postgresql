import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserModel {
    pepper: string = process.env.BCRYPT_PASSWORD as string;
    saltRounds: number = Number(process.env.SALT_ROUNDS);
    salt: string = bcrypt.genSaltSync(this.saltRounds);

    async index(): Promise<User[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get user ${id}. Error: ${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const hashedPass = bcrypt.hashSync(
                u.password + this.pepper,
                this.salt
            );
            const conn = await db.connect();
            const sql =
                'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                hashedPass,
            ]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not add user ${u.first_name}. Error: ${error}`
            );
        }
    }

    async authenticate(u: User): Promise<User | null> {
        try {
            const conn = await db.connect();
            const sql = ' SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [u.id]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];

                if (
                    bcrypt.compareSync(
                        u.password + this.pepper,
                        user.password_digest
                    )
                ) {
                    return user;
                }
            }

            return null;
        } catch (error) {
            throw new Error(
                `Could not authenticate user ${u.id}. Error: ${error}`
            );
        }
    }
}
