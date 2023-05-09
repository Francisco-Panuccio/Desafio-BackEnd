import { addProductService, getProductsService, getProductByIdService, updateProductService, deleteProductService, aggregationFuncService, aggregationFunc2Service, getLogsWinstonService } from "../service/products.services.js";
import { productsModel } from "../persistence/mongoDB/models/products.model.js"; 

export const addProductController = async (req, res) => {
    const prdc = req.body;
    const generatePrdc = await addProductService(prdc);
    res.json(generatePrdc)
}

export const getProductsController = async (req, res) => {
    const products = await getProductsService()
    res.json(products)
}

export const getProductByController = async (req, res) => {
    const {pid} = req.params;
    const idPrdct = await getProductByIdService(pid);
    res.json(idPrdct);
}

export const updateProductController = async (req, res) => {
    const {pid} = req.params;
    const objValue = req.body;
    const values = Object.values(objValue)
    const updatePrdc = await updateProductService(pid, values[0], values[1]);
    res.json(updatePrdc);
}

export const deleteProductController = async (req, res) => {
    const {pid} = req.params;
    const deletePrdc = await deleteProductService(pid);
    res.json(deletePrdc);
}

export const aggregationFuncController = async (req, res) => {
    const {category} = req.params;
    const {sort} = req.query;
    const categories = await aggregationFuncService(category, parseInt(sort));
    res.json({categories});
}

export const aggregationFunc2Controller = async (req, res) => {
    const {stock} = req.params;
    const {sort} = req.query;
    const stocks = await aggregationFunc2Service(parseInt(stock), parseInt(sort));
    res.json({stocks});
}

export const paginateController = async (req, res) => {
    const {limit=10, page=1, sort, query} = req.query
    const products = await productsModel.paginate({category: query}, {limit, page, sort: {price: sort}})
    const status = products.docs ? "success" : "error";
    const prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
    const nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
    res.json({results:{
        status,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink
    }});
}

export const getLogsWinstonController = async (req, res) => {
    const logs = await getLogsWinstonService();
    res.json(logs);
}