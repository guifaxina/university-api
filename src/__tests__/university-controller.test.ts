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

  async function createNewUniversity() {
    const response = await supertest(app).post("/universities").send({ data: {
      alpha_two_code: correctUniversity.alpha_two_code,
      name: correctUniversity.name,
      web_pages: correctUniversity.web_pages,
      "state-province": correctUniversity["state-province"],
      domains: correctUniversity.domains,
      country: correctUniversity.country
    }});

    return response;
  }

  describe("GET /universities/:id", () => {

    describe("given that the id parameter is not correctly formatted", () => {

      it("should return a 400", async () => {
        
        const wrongId = "wrongFormatId";
        const response = await supertest(app).get(`/universities/${wrongId}`);
      
        expect(response.status).toBe(400);
        expect(response.body.description).toBe("Expected a valid id.");

      });
    });

    describe("given that the id parameter is right", () => {

      it("should return a 200", async () => {

        const response = await createNewUniversity();

        const validId = response.body.data._id;
        await supertest(app).get(`/universities/${validId}`).expect(200);

      });
    });

    describe("given that the id parameter is correctly formatted, but the university does not exist", () => {
   
      it("should return a 404", async () => {

        const id = "63aec4bb3f1e8ed58fa03d11";
        await supertest(app).get(`/universities/${id}`).expect(404);

      });
    });
  });


  describe("POST /universities", () => {
    
    describe("register university", () => {

      it("should be able to create and persist a new university in the database", async () => {

        const response = await createNewUniversity();

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Successfully registered new university.");

      });
    });
  });

  describe("PUT /universities/:id", () => {

    describe("to update a university given the correct id and correct type information", () => {

      it("should return a 200 and a json containing the new university", async () => {

        const response = await createNewUniversity();
        const id = response.body.data._id;

        const updatedUniversity = await supertest(app).put(`/universities/${id}`).send({ web_pages: ["testing"], name: "Updated University Test", domains: ["http://testingnewdomain.com"] });

        expect(updatedUniversity.status).toBe(200);
        expect(updatedUniversity.body.data.web_pages).toStrictEqual(["testing"]);
        expect(updatedUniversity.body.data.name).toBe("Updated University Test");
        expect(updatedUniversity.body.data.domains).toStrictEqual(["http://testingnewdomain.com"]);

      });
    });

    describe("given an correct format id of an inexistent university", () => {

      it("should return 404", async () => {

        const id = "63aec4bb3f1e8ed58fa03d11";
        
        const response = await supertest(app).put(`/universities/${id}`).send({ web_pages: ["testing"] });

        expect(response.status).toBe(404);

      });

    });

    describe("given an wrong type to a property", () => {

      it("should return a 400", async () => {

        const response = await createNewUniversity();
        const id = response.body.data._id;

        const updatedUniversity = await supertest(app).put(`/universities/${id}`).send({ web_pages: {} });

        expect(updatedUniversity.status).toBe(400);

      });

    });

  });
});

