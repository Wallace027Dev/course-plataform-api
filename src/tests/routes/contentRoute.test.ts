import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

describe("Contents API", () => {
  let id = 0;

  it("Should return all contents", async () => {
    const response = await request(app)
      .get("/api/contents")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

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
      .expect(201);
    
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });

  it("Should return one content", async () => {
    const response = await request(app)
      .get(`/api/contents/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBe(id);
  });

  it("Should update one content", async () => {
    const updatedData = {
        type: "article",
        title: "Um título aqui",
        metadata: {
          level: "Legendary",
          contentType: "pdf"
        }
      }

    const response = await request(app)
      .put(`/api/contents/${id}`)
      .set("Accept", "application/json")
      .send(updatedData)
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject(updatedData);
    expect(response.body.data.id).toBe(id);
  });
});
