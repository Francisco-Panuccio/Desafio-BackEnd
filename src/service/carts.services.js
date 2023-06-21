import { addCart, getCarts, getCartById, addToCart, deletePrdcCart, deleteAllPrdcts, updatePrdctCart, updateCart, endPurchase, reduceStock, incStock } from "../persistence/persistence.js";

export async function addCartService(obj) {
    const cart = await addCart(obj);
    return cart;
}

export async function getCartsService() {
    const carts = await getCarts();
    return carts;
}

export async function getCartByIdService(id) {
    const cart = await getCartById(id);
    return cart;
}

export async function addToCartService(cid, pid) {
    const cart = await addToCart(cid, pid);
    return cart;
}

export async function deletePrdcCartService(cid, pid) {
    const cart = await deletePrdcCart(cid, pid);
    return cart;
}

export async function deleteAllPrdctsService(cid) {
    const cart = await deleteAllPrdcts(cid);
    return cart;
}

export async function updatePrdctCartService(cid, pid, qnt) {
    const cart = await updatePrdctCart(cid, pid, qnt);
    return cart;
}

export async function updateCartService(cid, arrayCart) {
    const cart = await updateCart(cid, arrayCart);
    return cart;
}

export async function reduceStockService(pid) {
    const cartEnd = await reduceStock(pid);
    return cartEnd;
}

export async function incStockService(pid, qnt) {
    const cartEnd = await incStock(pid, qnt);
    return cartEnd;
}

export async function endPurchaseService(email, total) {
    const ticket = await endPurchase(email, total);
    return ticket;
}