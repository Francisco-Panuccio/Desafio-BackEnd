export default class UsersDTO {
    constructor(user) {
        this.userName = `${user.first_name} ${user.last_name}`
        this.userEmail = user.email
        this.userRole = user.role
        this.userCart = user.cart
    }
}