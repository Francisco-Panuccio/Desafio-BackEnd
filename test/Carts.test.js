import "./db.js";
import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:8080');

const productCartMock_1 = {
    title: "Mock1",
    description: "MockingTest1",
    code: "test1",
    price: 123,
    status: true,
    stock: 123,
    category: "Mocking1",
    thumbnail: "MockTest1",
}

const productCartMock_2 = {
    title: "Mock2",
    description: "MockingTest2",
    code: "test2",
    price: 234,
    status: true,
    stock: 234,
    category: "Mocking2",
    thumbnail: "MockTest2",
}

describe('Testing de CartsDAO para MongoDB', function(){
    beforeEach(function () {
        this.timeout(10000)
    })

    it('Endpoint GET ALL /api/carts', async function(){
        const response = await request.get('/api/carts')
        expect(response._body).to.not.have.lengthOf(0)
    })
    it('Endpoint GET ID /api/carts/:pid', async function(){
        const id = "6421d4c04ebffc2e2504341d"
        const response = await request.get(`/api/carts/${id}`)
        expect(response._body).to.have.lengthOf(1)
        expect(response._body[0]._id).to.be.equal(id)
    })
    it('Endpoint POST /api/carts', async function(){
        const response = await request.post('/api/carts').send()
        expect(response._body).to.have.property('_id')
    })
    it('Endpoint POST PRODUCT /api/carts/:cid/products/:pid', async function(){
        const responsePostCart = await request.post('/api/carts').send()
        const cid = responsePostCart._body._id
        const pid = "64063768365800f6cd3f4ea2"
        const response = await request.post(`/api/carts/${cid}/products/${pid}`).send(productCartMock_1)
        const responseGet = await request.get(`/api/carts/${cid}`)
        expect(responseGet._body[0]._id).to.be.equal(cid)
        expect(responseGet._body[0].products[0].product._id).to.be.equal(pid)
    })
    it('Endpoint DELETE ALL PRDCS /api/carts/:cid', async function(){
        const responsePostCart = await request.post('/api/carts').send()
        const cid = responsePostCart._body._id
        const pid = "64063768365800f6cd3f4ea2"
        const pid2 = "640637f9365800f6cd3f4eac"
        const responsePostPrdc = await request.post(`/api/carts/${cid}/products/${pid}`).send(productCartMock_2)
        const responsePostPrdc2 = await request.post(`/api/carts/${cid}/products/${pid2}`).send(productCartMock_2)
        const responseDelete = await request.delete(`/api/carts/${cid}`)
        const responseGet = await request.get(`/api/carts/${cid}`)
        expect(responseGet._body[0].products).to.be.an("array").that.is.empty
    })
    it('Endpoint DELETE PRDC /api/carts/:cid/products/:pid', async function(){
        const responsePostCart = await request.post('/api/carts').send()
        const cid = responsePostCart._body._id
        const pid = "64063768365800f6cd3f4ea2"
        const responsePostPrdc = await request.post(`/api/carts/${cid}/products/${pid}`).send(productCartMock_2)
        const responseDelete = await request.delete(`/api/carts/${cid}/products/${pid}`)
        const responseGet = await request.get(`/api/carts/${cid}`)
        expect(responseGet._body[0].products).to.be.an("array").that.is.empty
    })
})