import { createUser, loginUser, getUserByEmail, getProfileUser, getMail, changeRole, recoveryForm, changeLastConnection, deleteInactiveUsers, userList, deleteUser } from "../persistence/persistence.js";

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

export async function changeLastConnectionService(email) {
    const user = await changeLastConnection(email);
    return user;
}

export async function deleteInactiveUsersService() {
    const users = await deleteInactiveUsers();
    return users;
}

export async function userListService() {
    const users = await userList();
    return users;
}

export async function deleteUserService(uid) {
    const user = await deleteUser(uid);
    return user;
}