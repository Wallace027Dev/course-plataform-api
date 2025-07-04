import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("Attempts API", () => {
  it("Should return all attempts", async () => {
    const response = await request(app)
      .get("/api/attempts")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

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

  it("Should return one attempt", async () => {
    const response = await request(app)
      .get(`/api/attempts/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });

  it("Should update one attempt", async () => {
    const response = await request(app)
      .put(`/api/attempts/${id}`)
      .set("Accept", "application/json")
      .send({
        userId: 1,
        quizId: 2,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      userId: 1,
      quizId: 2,
    });
  });
});
