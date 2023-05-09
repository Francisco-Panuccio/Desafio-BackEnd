import { getMockingProducts, generateMockingProducts } from "../persistence/persistence.js";

export async function getMockingProductsService() {
    const prdcs = await getMockingProducts();
    return prdcs;
}

export async function generateMockingProductsService() {
    const prdcs = await generateMockingProducts();
    return prdcs;
}