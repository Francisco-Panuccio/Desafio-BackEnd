import { addProduct, getProducts, getProductById, updateProduct, deleteProduct, aggregationFunc, aggregationFunc2, getMockingProducts, generateMockingProducts, getLogsWinston } from "../persistence/persistence.js";

export async function addProductService(obj) {
    const product = await addProduct(obj);
    return product;
}

export async function getProductsService() {
    const products = await getProducts();
    return products;
}

export async function getProductByIdService(id) {
    const product = await getProductById(id);
    return product;
}

export async function updateProductService(id, field, value) {
    const product = await updateProduct(id, field, value);
    return product;
}

export async function deleteProductService(id) {
    const product = await deleteProduct(id);
    return product;
}

export async function aggregationFuncService(ctg, srt) {
    const product = await aggregationFunc(ctg, srt);
    return product;
}

export async function aggregationFunc2Service(ctg, srt) {
    const product = await aggregationFunc2(ctg, srt);
    return product;
}

export async function getMockingProductsService() {
    const prdcs = await getMockingProducts();
    return prdcs;
}

export async function generateMockingProductsService() {
    const prdcs = await generateMockingProducts();
    return prdcs;
}

export async function getLogsWinstonService() {
    const logs = await getLogsWinston();
    return logs;
}