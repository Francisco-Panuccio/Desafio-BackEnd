import "./db.js";
import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:8080');

const userMockRegister = {
    first_name: "Gabriel",
    last_name: "Geronimo",
    email: "gg@hotmail.com",
    password: "123"
}

const userMockLogin = {
    email: "gg@hotmail.com",
    password: "123"
}

describe('Testing de UsersDAO para MongoDB', function(){
    beforeEach(function () {
        this.timeout(10000)
    })

    it('Endpoint POST REGISTER /api/users/register', async function(){
        const response = await request.post('/api/users/register').send(userMockRegister)
        expect(response.headers).to.be.ok
    })
    it('Endpoint POST LOGIN /api/users/login', async function(){
        const response = await request.post('/api/users/login').send(userMockLogin)
        const cookieResult = response.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok
    })
})