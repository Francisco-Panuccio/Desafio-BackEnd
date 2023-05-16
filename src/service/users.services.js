import { createUser, loginUser, getUserByEmail, getProfileUser, getMail, changeRole, recoveryForm } from "../persistence/persistence.js";

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

export async function getMailService(userEmail) {
    const mailing = await getMail(userEmail);
    return mailing;
}

export async function changeRoleService(uid) {
    const uidRole = await changeRole(uid);
    return uidRole;
}

export async function recoveryFormService(userData) {
    const userFound = await recoveryForm(userData);
    return userFound;
}