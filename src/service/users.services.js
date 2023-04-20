import { createUser, loginUser, getUserByEmail, getProfileUser } from "../persistence/persistence.js";

export async function createUserService(user) {
    const userC = await createUser(user);
    return userC;
}

export async function loginUserService(user) {
    const userL = await loginUser(user);
    return userL;
}

export async function getUserByEmailService(email) {
    const user = await getUserByEmail(email);
    return user;
}

export async function getProfileUserService(user) {
    const userP = await getProfileUser(user);
    return userP;
}