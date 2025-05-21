import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/journeys", () => {
  it("Should return all journeys", async () => {
    const response = await request(app)
      .get("/api/journeys")
      .set("Accept", "application/json")
      .expect("journey-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/journeys", () => {
  it("Should create one journey", async () => {
    const response = await request(app)
      .post("/api/journeys")
      .set("Accept", "application/json")
      .send({
        name: "Um teste",
        courseId: 1,
        coverUrl: "src/uma-image.png"
      })
      .expect("journey-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});

describe("GET em api/journeys/:id", () => {
  it("Should return one journey", async () => {
    const response = await request(app)
      .get(`/api/journeys/${id}`)
      .set("Accept", "application/json")
      .expect("journey-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/journeys/:id", () => {
  it("Should update one journey", async () => {
    const now = new Date().toISOString();
    
    const response = await request(app)
      .put(`/api/journeys/${id}`)
      .set("Accept", "application/json")
      .send({
        quizId: 1,
      })
      .expect("journey-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      name: "Outro teste",
        courseId: 2,
        coverUrl: "src/outra-image.png"
    });
  });
});
