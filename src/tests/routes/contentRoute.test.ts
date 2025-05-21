import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/contents", () => {
  it("Should return all contents", async () => {
    const response = await request(app)
      .get("/api/contents")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/contents", () => {
  it("Should create one content", async () => {
    const response = await request(app)
      .post("/api/contents")
      .set("Accept", "application/json")
      .send({
        journeyId: 1,
        type: "video",
        title: "Arquitetura de Computadores",
        order: 1,
        metadata: {
          level: "Newbie",
          contentType: "video",
          thumb: "https://meusite.com/imagens/programming-logic.jpg",
          contentUrl: "https://meusite.com/videos/exemplo.mp4",
          objetive: "Entender a base física e lógica dos sistemas computacionais.",
          instructor: "Wallace Vieira",
          description: "Introdução à estrutura física e lógica dos computadores."
        },
        quizId: null,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});

describe("GET em api/contents/:id", () => {
  it("Should return one content", async () => {
    const response = await request(app)
      .get(`/api/contents/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBe(id);
  });
});

describe("PUT em api/contents/:id", () => {
  it("Should update the quizId of one content", async () => {
    const response = await request(app)
      .put(`/api/contents/${id}`)
      .set("Accept", "application/json")
      .send({
        quizId: 2, // <- valor atualizado corretamente
      })
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
    expect(response.body.data.quizId).toBe(2);
  });
});
