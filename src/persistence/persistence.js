import CartsMongoDB from "./DAOs/cartsDAO/CartManager.js";
import ProductsMongoDB from "./DAOs/productsDAO/ProductManager.js";
import UsersMongoDB from "./DAOs/usersDAO/UserManager.js";
import MessagesMongoDB from "./DAOs/messagesDAO/MessageManager.js";
import MockingMongoDB from "./DAOs/mockingsDAO/MockingManager.js";

let persistenceCart = new CartsMongoDB();
let persistenceProduct = new ProductsMongoDB();
let persistenceUser = new UsersMongoDB();
let persistenceMessage = new MessagesMongoDB();
let persistenceMocking = new MockingMongoDB();

export async function addCart(obj) {
    return await persistenceCart.addCart(obj);
}
export async function getCarts() {
    return await persistenceCart.getCarts();
}
export async function getCartById(id) {
    return await persistenceCart.getCartById(id);
}
export async function addToCart(cid, pid) {
    return await persistenceCart.addToCart(cid, pid);
}
export async function deletePrdcCart(cid, pid) {
    return await persistenceCart.deletePrdcCart(cid, pid);
}
export async function deleteAllPrdcts(cid) {
    return await persistenceCart.deleteAllPrdcts(cid);
}
export async function updatePrdctCart(cid, pid, qnt) {
    return await persistenceCart.updatePrdctCart(cid, pid, qnt);
}
export async function updateCart(cid, arrayCart) {
    return await persistenceCart.updateCart(cid, arrayCart);
}
export async function reduceStock(pid) {
    return await persistenceCart.reduceStock(pid);
}
export async function incStock(pid, qnt) {
    return await persistenceCart.incStock(pid, qnt);
}
export async function endPurchase(email, total) {
    return await persistenceCart.endPurchase(email, total)
}


export async function addProduct(obj) {
    return await persistenceProduct.addProduct(obj);
}
export async function getProducts() {
    return await persistenceProduct.getProducts();
}
export async function getProductById(id) {
    return await persistenceProduct.getProductById(id);
}
export async function updateProduct(id, field, value) {
    return await persistenceProduct.updateProduct(id, field, value);
}
export async function deleteProduct(id) {
    return await persistenceProduct.deleteProduct(id);
}
export async function aggregationFunc(ctg, srt) {
    return await persistenceProduct.aggregationFunc(ctg, srt);
}
export async function aggregationFunc2(ctg, srt) {
    return await persistenceProduct.aggregationFunc2(ctg, srt);
}
export async function logsWinston() {
    return await persistenceProduct.logsWinston();
}


export async function createUser(user) {
    return await persistenceUser.createUser(user);
}
export async function loginUser(user) {
    return await persistenceUser.loginUser(user);
}
export async function getUserByEmail(email) {
    return await persistenceUser.getUserByEmail(email);
}
export async function getProfileUser(user) {
    return await persistenceUser.getProfileUser(user);
}
export async function getMail(userEmail) {
    return await persistenceUser.getMail(userEmail);
}
export async function changeRole(uid) {
    return await persistenceUser.changeRole(uid);
}
export async function recoveryForm(userData) {
    return await persistenceUser.recoveryForm(userData);
}
export async function changeLastConnection(email) {
    return await persistenceUser.changeLastConnection(email);
}
export async function deleteInactiveUsers() {
    return await persistenceUser.deleteInactiveUsers();
}
export async function userList() {
    return await persistenceUser.userList();
}
export async function deleteUser(uid) {
    return await persistenceUser.deleteUser(uid);
}


export async function addMessage(obj) {
    return await persistenceMessage.addMessage(obj);
}
export async function getMessages() {
    return await persistenceMessage.getMessages();
}


export async function getMockingProducts() {
    return await persistenceMocking.getMockingProducts();
}
export async function generateMockingProducts() {
    return await persistenceMocking.generateMockingProducts();
}