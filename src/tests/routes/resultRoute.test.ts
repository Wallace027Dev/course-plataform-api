import "../setup";
import app from "../../app";
import request from "supertest";
import { describe, expect, it } from '@jest/globals';

let resultId: number;

const resultPayload = {
  feedback: "Parabéns",
  score: 10,
  attemptId: Math.floor(Math.random() * 1000),
};

const updatedResultPayload = {
  feedback: "Não foi tão bem",
  score: 2,
  attemptId: Math.floor(Math.random() * 1000),
};

describe("result API", () => {
  describe("GET /api/results", () => {
    it("should return all resultzes", async () => {
      const res = await request(app)
        .get("/api/results")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/results", () => {
    it("should create a result", async () => {
      const res = await request(app)
        .post("/api/results")
        .set("Accept", "application/json")
        .send(resultPayload)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body.data).toBeDefined();
      resultId = res.body.data.id;
    });
  });

  describe("GET /api/result/:id", () => {
    it("should return a result by id", async () => {
      const res = await request(app)
        .get(`/api/results/${resultId}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.data).toBeDefined();
      expect(res.body.data.id).toBe(resultId);
    });
  });

  describe("PUT /api/result/:id", () => {
    it("should update a result", async () => {
      const res = await request(app)
        .put(`/api/results/${resultId}`)
        .set("Accept", "application/json")
        .send(updatedResultPayload)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.data.feedback).toBe(updatedResultPayload.feedback);
      expect(res.body.data.score).toBe(updatedResultPayload.score);
      expect(res.body.data.attemptId).toBe(updatedResultPayload.attemptId);
    });
  });
});
