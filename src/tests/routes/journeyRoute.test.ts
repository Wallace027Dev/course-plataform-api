import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("Journey API", () => {
  it("Should return all journeys", async () => {
    const response = await request(app)
      .get("/api/journeys")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("Should create one journey", async () => {
    const response = await request(app)
      .post("/api/journeys")
      .set("Accept", "application/json")
      .send({
        name: "Um teste",
        courseId: 1,
        coverUrl: "src/uma-image.png"
      })
      .expect("Content-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });

  it("Should return journeys of a course", async () => {
    const response = await request(app)
      .get(`/api/journeys/course/1`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("Should return one journey", async () => {
    const response = await request(app)
      .get(`/api/journeys/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });

  it("Should update one journey", async () => {
    const response = await request(app)
      .put(`/api/journeys/${id}`)
      .set("Accept", "application/json")
      .send({
        name: "Outro teste",
        coverUrl: "src/outra-image.png"
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      name: "Outro teste",
      courseId: 1,
      coverUrl: "src/outra-image.png"
    });
  });
});
