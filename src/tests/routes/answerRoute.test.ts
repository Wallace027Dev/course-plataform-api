import app from "../../app";
import request from "supertest";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

let server: any;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

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

describe("GET em api/answers/:id", () => {
  it("Should return one answer", async () => {
    const response = await request(app)
      .get("/api/answers/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
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
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/answers/:id", () => {
  it("Should update one answer", async () => {
    const response = await request(app)
      .put("/api/answers/1")
      .set("Accept", "application/json")
      .send({
        text: "Text",
        correct: true,
        questionId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});