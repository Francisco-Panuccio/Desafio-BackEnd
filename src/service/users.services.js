import { createUser, loginUser, getUserByEmail } from "../persistence/persistence.js";

export async function createUserService(user) {
    const userC = await createUser(user);
    return userC;
}

export async function loginUserService(user) {
    const userC = await loginUser(user);
    return userC;
}

export async function getUserByEmailService(email) {
    const user = await getUserByEmail(email);
    return user;
}