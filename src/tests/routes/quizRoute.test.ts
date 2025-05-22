import "../setup";
import app from "../../app";
import request from "supertest";
import { describe, expect, it } from '@jest/globals';

let quizId: number;

const quizPayload = {
  name: "Quiz sobre JavaScript Básico",
  questions: [
    {
      question: "Qual é o tipo de dado retornado por `typeof null` em JavaScript?",
      explication: "Apesar de parecer estranho, `typeof null` retorna 'object' por uma falha histórica da linguagem.",
      answers: [
        { text: "null", correct: false },
        { text: "object", correct: true },
        { text: "undefined", correct: false },
        { text: "boolean", correct: false }
      ]
    },
    {
      question: "Qual destes métodos é usado para adicionar um item ao final de um array?",
      explication: "O método `.push()` adiciona um ou mais elementos ao final de um array.",
      answers: [
        { text: ".pop()", correct: false },
        { text: ".shift()", correct: false },
        { text: ".push()", correct: true },
        { text: ".unshift()", correct: false }
      ]
    },
    {
      question: "Qual destes métodos é usado para adicionar um item ao final de um array?",
      explication: "O método `.push()` adiciona um ou mais elementos ao final de um array.",
      answers: [
        { text: ".pop()", correct: false },
        { text: ".shift()", correct: false },
        { text: ".push()", correct: true },
        { text: ".unshift()", correct: false }
      ]
    }
  ]
};

const updatedQuizPayload = {
  name: "Outro teste",
  questions: [
    {
      question: "Alterando a pergunta",
      explication: "Explicação alterada",
      answers: [
        { text: "Resposta 1", correct: false },
        { text: "Resposta 2", correct: true },
        { text: "Resposta 3", correct: false },
        { text: "Resposta 4", correct: false }
      ]
    }
  ]
};

describe("Quiz API", () => {
  describe("GET /api/quiz", () => {
    it("should return all quizzes", async () => {
      const res = await request(app)
        .get("/api/quizzes")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/quiz", () => {
    it("should create a quiz", async () => {
      const res = await request(app)
        .post("/api/quizzes")
        .set("Accept", "application/json")
        .send(quizPayload)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body.data).toBeDefined();
      quizId = res.body.data.id;
    });
  });

  describe("GET /api/quiz/:id", () => {
    it("should return a quiz by id", async () => {
      const res = await request(app)
        .get(`/api/quizzes/${quizId}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.data).toBeDefined();
      expect(res.body.data.id).toBe(quizId);
    });
  });

  describe("PUT /api/quiz/:id", () => {
    it("should update a quiz", async () => {
      const res = await request(app)
        .put(`/api/quizzes/${quizId}`)
        .set("Accept", "application/json")
        .send(updatedQuizPayload)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.data.name).toBe(updatedQuizPayload.name);
      expect(res.body.data.questions[0].question).toBe(updatedQuizPayload.questions[0].question);
    });
  });
});
