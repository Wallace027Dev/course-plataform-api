import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/answers", () => {
  it("Should return all answers", async () => {
    const response = await request(app)
      .get("/api/answers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/answers", () => {
  it("Should create one answer", async () => {
    const response = await request(app)
      .post("/api/answers")
      .set("Accept", "application/json")
      .send({
        text: "Text",
        correct: true,
        questionId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});



describe("GET em api/answers/:id", () => {
  it("Should return one answer", async () => {
    const response = await request(app)
      .get(`/api/answers/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/answers/:id", () => {
  it("Should update one answer", async () => {
    const response = await request(app)
      .put(`/api/answers/${id}`)
      .set("Accept", "application/json")
      .send({
        text: "Text",
        correct: true,
        questionId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      text: "Text",
      correct: true,
      questionId: 1
    });
  });
});