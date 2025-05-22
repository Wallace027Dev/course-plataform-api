import "../setup";
import app from "../../app";
import request from "supertest";
import { describe, expect, it } from "@jest/globals";

describe("userCourse API", () => {
  const userCoursePayload = {
    userId: 1,
    courseId: 1,
  };

  describe("POST /api/register/:courseId/students/:userId", () => {
    it("should create a userCourse", async () => {
      const res = await request(app)
        .post(`/api/register/${userCoursePayload.courseId}/students/${userCoursePayload.userId}`)
        .set("Accept", "application/json")
        .send(userCoursePayload)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body.data).toBeDefined();
    });
  });

  describe("DELETE /api/register/:courseId/students/:userId", () => {
    it("should delete a userCourse", async () => {
      const res = await request(app)
        .delete(`/api/register/${userCoursePayload.courseId}/students/${userCoursePayload.userId}`)
        .set("Accept", "application/json")
        .send(userCoursePayload)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.data).toBeDefined();
    });
  });
});
