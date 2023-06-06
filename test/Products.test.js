import "./db.js";
import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:8080');

const productMock_1 = {
    title: "Mock1",
    description: "MockingTest1",
    code: "test1",
    price: 123,
    status: true,
    stock: 123,
    category: "Mocking1",
    thumbnail: "MockTest1",
} 

const productMock_2 = {
    title: "MockPut2",
    description: "MockingPutTest2",
    code: "test2",
    price: 234,
    status: true,
    stock: 234,
    category: "Mocking2",
    thumbnail: "MockTest2",
} 

const productMock_3 = {
    title: "title",
    MockPut3: "MockPut3"
}

const productMock_4 = {
    title: "Mock4",
    description: "MockingTest4",
    code: "test4",
    price: 345,
    status: true,
    stock: 345,
    category: "Mocking4",
    thumbnail: "MockTest4",
} 

describe('Testing de ProductsDAO para MongoDB', function(){
    beforeEach(function () {
        this.timeout(10000)
    })

    it('Endpoint GET ALL /api/products', async function(){
        const response = await request.get('/api/products')
        expect(response._body).to.not.have.lengthOf(0)
    })
    it('Endpoint GET ID /api/products/:pid', async function(){
        const id = "6406378a365800f6cd3f4ea4"
        const response = await request.get(`/api/products/${id}`)
        expect(response._body._id).to.be.equal(id)
    })
    it('Endpoint POST /api/products', async function(){
        const response = await request.post('/api/products').send(productMock_1)
        expect(response._body).to.have.property('_id')
    })
    it('Endpoint PUT ID /api/products/:pid', async function(){
        const responsePost = await request.post('/api/products').send(productMock_2)
        const id = responsePost._body._id
        const responsePut = await request.put(`/api/products/${id}`).send(productMock_3)
        const responseGet = await request.get(`/api/products/${id}`)
        expect(responseGet._body.title).to.not.be.equal(productMock_2.title)
    })
    it('Endpoint DELETE ID /api/products/:pid', async function(){
        const responsePost = await request.post('/api/products').send(productMock_4)
        const id = responsePost._body._id
        const responseDelete = await request.delete(`/api/products/${id}`)
        const responseGet = await request.get(`/api/products/${id}`)
        expect(responseGet._body).to.be.equal(null)
    })
})