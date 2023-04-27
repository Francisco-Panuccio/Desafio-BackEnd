import { faker } from "@faker-js/faker";

export function generateProducts() {
    const prdcs = [];
    for(let i = 1; i < 101; i++) {
        const mockingPrdcs = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.random.alpha(3),
            price: faker.commerce.price(1000, 10000, 0),
            status: true,
            stock: faker.random.numeric(2),
            category: faker.commerce.department(),
            thumbnail: faker.image.imageUrl(),
        }
        prdcs.push(mockingPrdcs)
    }
    return prdcs;
}