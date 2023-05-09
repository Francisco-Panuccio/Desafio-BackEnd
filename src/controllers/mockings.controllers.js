import { getMockingProductsService, generateMockingProductsService } from "../service/mockings.services.js";

export const getMockingProductsController = async (req, res) => {
    const prdcs = await getMockingProductsService();
    res.json(prdcs);
}

export const generateMockingProductsController = async (req, res) => {
    const prdc = await generateMockingProductsService();
    res.json(prdc);
}