import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/attempts", () => {
  it("Should return all attempts", async () => {
    const response = await request(app)
      .get("/api/attempts")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/attempts", () => {
  it("Should create one attempt", async () => {
    const response = await request(app)
      .post("/api/attempts")
      .set("Accept", "application/json")
      .send({
        userId: 1,
        quizId: 1
      })
      .expect("Content-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});

describe("GET em api/attempts/:id", () => {
  it("Should return one attempt", async () => {
    const response = await request(app)
      .get(`/api/attempts/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/attempts/:id", () => {
  it("Should update one attempt", async () => {
    const now = new Date().toISOString();
    
    const response = await request(app)
      .put(`/api/attempts/${id}`)
      .set("Accept", "application/json")
      .send({
        userId: 1,
        quizId: 2,
        deletedAt: now
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      userId: 1,
      quizId: 2,
      deletedAt: now
    });
  });
});
