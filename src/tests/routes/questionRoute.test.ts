import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';

let id = 0;

describe("GET em api/questions", () => {
  it("Should return all questions", async () => {
    const response = await request(app)
      .get("/api/questions")
      .set("Accept", "application/json")
      .expect("question-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST em api/questions", () => {
  it("Should create one question", async () => {
    const response = await request(app)
      .post("/api/questions")
      .set("Accept", "application/json")
      .send({
        question: "O que são Soft Skills?",
        explication: "Soft Skills são habilidades comportamentais como comunicação, trabalho em equipe, liderança e empatia.",
        quizId: 1,
        answers: [
            {
                text: "Habilidades técnicas de programação",
                correct: false,
                questionId: 1
            },
            {
                text: "Comportamentos e habilidades interpessoais",
                correct: true,
                questionId: 1
            },
            {
                text: "Ferramentas para automatizar tarefas",
                correct: false,
                questionId: 1
            }
        ]
      })
      .expect("question-Type", /json/)
      .expect(201);
    id = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });
});

describe("GET em api/questions/:id", () => {
  it("Should return one question", async () => {
    const response = await request(app)
      .get(`/api/questions/${id}`)
      .set("Accept", "application/json")
      .expect("question-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT em api/questions/:id", () => {
  it("Should update one question", async () => {
    const now = new Date().toISOString();
    
    const response = await request(app)
      .put(`/api/questions/${id}`)
      .set("Accept", "application/json")
      .send({
        question: "Alterando a pergunta",
        explication: "Alterando a descrição",
        quizId: 2,
        answers: [
            {
                text: "Alterando a resposta 1",
                correct: true,
                questionId: 1
            },
            {
                text: "Alterando a resposta 2",
                correct: false,
                questionId: 1
            },
            {
                text: "Alterando a resposta 3",
                correct: true,
                questionId: 1
            }
        ]
      })
      .expect("question-Type", /json/)
      .expect(200);
    
    expect(response.body.data).toMatchObject({
      name: "Outro teste",
      courseId: 2,
      coverUrl: "src/outra-image.png"
    });
  });
});
