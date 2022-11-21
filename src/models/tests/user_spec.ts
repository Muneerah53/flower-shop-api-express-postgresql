import { User, UserModel } from '../user';

const user = new UserModel();

describe('Test User Model', () => {
    describe('Test User Model methods', () => {
        it('should have an index method', () => {
            expect(user.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(user.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(user.create).toBeDefined();
        });

        it('should have an authenticate method', () => {
            expect(user.authenticate).toBeDefined();
        });
    });

    describe('Test User Model methods logic', () => {
        const testUser: User = {
            first_name: 'Flora',
            last_name: 'Blume',
            password: 'password123',
        };

        it('create method should add a user', async () => {
            const result = (await user.create(testUser)) as User;
            testUser.id = result.id;
            expect(result.first_name).toEqual(testUser.first_name);
            expect(result.last_name).toEqual(testUser.last_name);
        });

        it('authenticate method should return a user', async () => {
            const result = (await user.authenticate(testUser)) as User;

            expect(result).not.toBeNull();
            expect(result.id).toEqual(testUser.id!);
            expect(result.first_name).toEqual(testUser.first_name);
            expect(result.last_name).toEqual(testUser.last_name);
        });

        it('authenticate method should return null', async () => {
            const falseUser: User = {
                id: 1,
                first_name: 'Stanley',
                last_name: 'Hans',
                password: 'pass123',
            };
            const result = (await user.authenticate(falseUser)) as User;

            expect(result).toBeNull();
        });

        it('index method should return a list of users', async () => {
            const result = await user.index();
            expect(result.length).toBeTruthy();
        });

        it('show method should return the correct user', async () => {
            const result = await user.show(testUser.id!.toString());

            expect(result.id).toEqual(testUser.id);
            expect(result.first_name).toEqual(testUser.first_name);
            expect(result.last_name).toEqual(testUser.last_name);
        });
    });
});
