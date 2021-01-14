const server = require("../server")
const request = require('supertest')
const mongoose = require("mongoose")
describe(
    "server run properly", ()=>{
        it("GET /types", async (done)=>{
            request(server).get("/types")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
        it("GET crypto/:name",async (done)=>{
            request(server).get("/crypto/xrp")
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(200,done)
        });
        it("GET crypto/:wrongname",async (done)=>{
            request(server).get("/crypto/wrong-query")
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(404,done)
        })

    }
)