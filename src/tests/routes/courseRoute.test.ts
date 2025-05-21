import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/courses", () => {
  it("Should return all courses", async () => {
    const response = await request(app)
      .get("/api/courses")
      .set("Accept", "application/json")
      .expect("course-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/courses", () => {
  it("Should create one course", async () => {
    const response = await request(app)
      .post("/api/courses")
      .set("Accept", "application/json")
      .send({
        name: "PlayGO",
        description: "Curso de design e inglês para iniciantes pensando no mercado",
        coverUrl: "src/uma-image.png"
      })
      .expect("course-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});

describe("GET em api/courses/:id", () => {
  it("Should return one course", async () => {
    const response = await request(app)
      .get(`/api/courses/${id}`)
      .set("Accept", "application/json")
      .expect("course-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/courses/:id", () => {
  it("Should update one course", async () => {
    const now = new Date().toISOString();
    
    const response = await request(app)
      .put(`/api/courses/${id}`)
      .set("Accept", "application/json")
      .send({
        quizId: 1,
      })
      .expect("course-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      name: "nome alterado",
      description: "Descrição alterada",
      coverUrl: "src/outra-imagem.png"
    });
  });
});
