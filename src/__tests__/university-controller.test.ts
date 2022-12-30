import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../utils/server";

const correctUniversity = {
  alpha_two_code: "BR",
  name: "Universidade Federal do Ceará",
  web_pages: ["https://example.com"],
  "state-province": "CE",
  domains: ["https://example.com"],
  country: "Brazil"
};

jest.setTimeout(30000);

describe("universities route", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("GET /universities", () => {

    describe("given that the id parameter is not correctly formatted", () => {

      it("should return a 400", async () => {
        
        const wrongId = "wrongFormatId";
        const response = await supertest(app).get(`/universities/${wrongId}`);
      
        expect(response.status).toBe(400);
        expect(response.body.description).toEqual("Expected a valid id.");

      });
    });

    describe("given that the id parameter is right", () => {

      it("should return a 200", async () => {

        const response = await supertest(app).post("/universities").send({ data: {
          alpha_two_code: correctUniversity.alpha_two_code,
          name: correctUniversity.name,
          web_pages: correctUniversity.web_pages,
          "state-province": correctUniversity["state-province"],
          domains: correctUniversity.domains,
          country: correctUniversity.country
        }});
        const validId = response.body.data._id;
        await supertest(app).get(`/universities/${validId}`).expect(200);

      });
    });

    describe("given that the ID is correctly formatted, but the university does not exist", () => {
   
      it("should return a 404", async () => {

        const id = "63aec4bb3f1e8ed58fa03d11";
        await supertest(app).get(`/universities/${id}`).expect(404);

      });
    });
  });


  describe("POST /universities", () => {
    
    describe("register university", () => {

      it("should be able to create and persist a new university in the database", async () => {

        const response = await supertest(app).post("/universities").send({ data: {
          alpha_two_code: correctUniversity.alpha_two_code,
          name: correctUniversity.name,
          web_pages: correctUniversity.web_pages,
          "state-province": correctUniversity["state-province"],
          domains: correctUniversity.domains,
          country: correctUniversity.country
        }});

        expect(response.status).toBe(201);
        

      });
    });

  });
});

