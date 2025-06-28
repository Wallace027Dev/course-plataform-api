import "../setup";
import app from "../../app";
import request from "supertest";
import {
  describe,
  expect,
  it,
} from '@jest/globals';


let questionId: number;

describe("Questions API", () => {
  it("Should return all questions", async () => {
    const response = await request(app)
      .get("/api/questions")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("Should create one question", async () => {
    const response = await request(app)
      .post("/api/questions")
      .set("Accept", "application/json")
      .send({
        question: "O que são Soft Skills?",
        explication:
          "Soft Skills são habilidades comportamentais como comunicação, trabalho em equipe, liderança e empatia.",
        quizId: 1,
        answers: [
          {
            text: "Habilidades técnicas de programação",
            correct: false,
            questionId: 1,
          },
          {
            text: "Comportamentos e habilidades interpessoais",
            correct: true,
            questionId: 1,
          },
          {
            text: "Ferramentas para automatizar tarefas",
            correct: false,
            questionId: 1,
          },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(201);
    questionId = response.body.data.id;
    expect(response.body.data).toBeDefined();
  });

  it("Should return one question", async () => {
    const response = await request(app)
      .get(`/api/questions/${questionId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBe(questionId);
  });

  it("Should update one question", async () => {
    const response = await request(app)
      .put(`/api/questions/1`)
      .set("Accept", "application/json")
      .send({
        question: "Alterando a pergunta",
        explication: "Alterando a descrição",
        quizId: 2,
        answers: [
          {
            text: "Alterando a resposta 1",
            correct: true,
            questionId: 1,
          },
          {
            text: "Alterando a resposta 2",
            correct: false,
            questionId: 1,
          },
          {
            text: "Alterando a resposta 3",
            correct: true,
            questionId: 1,
          },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.data).toMatchObject({
      name: "Outro teste",
      courseId: 2,
      coverUrl: "src/outra-image.png",
    });
  });
});
