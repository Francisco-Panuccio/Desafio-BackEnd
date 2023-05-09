import { mockingsModel } from "../../mongoDB/models/mockings.model.js";
import { generateProducts } from "../../../public/functions/mockings.js";

export default class MockingManager {
async generateMockingProducts() {
        try {
            const prdcts = generateProducts();
            const newPrdcs = await mockingsModel.create(prdcts);
            return newPrdcs;
        } catch (error) {
            logger.error(error)
        }
    }

    async getMockingProducts() {
        try {
            const prdcs = await mockingsModel.find({});
            return prdcs;
        } catch (error) {
            logger.error(error)
        }
    }
}