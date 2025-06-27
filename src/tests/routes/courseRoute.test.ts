import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("Courses API", () => {
  const coursePayload = {
    name: "PlayGO",
    description: "Curso de design e inglês para iniciantes pensando no mercado",
    coverUrl: "src/uma-image.png"
  }

  const updatePayload = {
    name: "Nome dois",
    description: "Descrição alterada, mas ela tem que ser grande, então vamos escrever mais",
    coverUrl: "src/outra-image.png"
  }

  it("Should return all courses", async () => {
    const response = await request(app)
      .get("/api/courses")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("Should create one course", async () => {
    const response = await request(app)
      .post("/api/courses")
      .set("Accept", "application/json")
      .send(coursePayload)
      .expect("Content-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });

  it("Should return one course", async () => {
    const response = await request(app)
      .get(`/api/courses/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });

  it("Should update one course", async () => {
    const response = await request(app)
      .put(`/api/courses/${id}`)
      .set("Accept", "application/json")
      .send(updatePayload)
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject(updatePayload);
  });
});
