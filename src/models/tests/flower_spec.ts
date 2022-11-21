import { Flower, FlowerModel } from '../flower';

const flowerModel = new FlowerModel();

describe('Test Flower Model', () => {
    describe('Test if Flower Model methods exist', () => {
        it('should have an index method', () => {
            expect(flowerModel.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(flowerModel.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(flowerModel.create).toBeDefined();
        });

        it('should have a update method', () => {
            expect(flowerModel.update).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(flowerModel.delete).toBeDefined();
        });
        it('should have a flower by color method', () => {
            expect(flowerModel.flowersByColor).toBeDefined();
        });
    });

    describe('Test Flower Model logic', () => {
        const testFlower: Flower = {
            name: 'Cymbidium Orchid',
            price: 60,
            color: 'Pink',
        };
        it('create method should add a flower', async () => {
            const result = await flowerModel.create(testFlower);
            testFlower.id = result.id!;
            expect(result).toEqual({
                id: testFlower.id,
                name: testFlower.name,
                price: testFlower.price,
                color: testFlower.color,
            });
        });

        it('index method should return a list of flowers', async () => {
            const result = await flowerModel.index();
            expect(result).toEqual([
                {
                    id: testFlower.id,
                    name: testFlower.name,
                    price: testFlower.price,
                    color: testFlower.color,
                },
            ]);
        });

        it('show method should return the correct flower', async () => {
            const result = await flowerModel.show(testFlower.id!.toString());
            expect(result).toEqual({
                id: testFlower.id,
                name: testFlower.name,
                price: testFlower.price,
                color: testFlower.color,
            });
        });

        it('update method should update the flower', async () => {
            const updateFlower: Flower = {
                id: testFlower.id,
                name: testFlower.name,
                price: 100,
                color: 'Yellow',
            };
            const result = await flowerModel.update(updateFlower);

            expect(result).toEqual({
                id: testFlower.id,
                name: updateFlower.name,
                price: updateFlower.price,
                color: updateFlower.color,
            });
        });

        it('find by color method should return the correct flower', async () => {
            const result = await flowerModel.flowersByColor('Yellow');
            expect(result).toEqual([
                {
                    id: testFlower.id,
                    name: testFlower.name,
                    price: 100,
                    color: 'Yellow',
                },
            ]);
        });

        it('delete method should delete the flower', async () => {
            await flowerModel.delete(testFlower.id!.toString());
            const result = await flowerModel.index();

            expect(result).toEqual([]);
        });
    });
});
