import { describe, expect, it } from "@jest/globals";
import { validateCreateAttempt } from "../../schemas/AttemptSchema";

describe("Testing attempt schema", () => {
  const attemptObject = {
    userId: 1,
    quizId: 1
  };

  it("Should validate attempt", () => {
    const isInvalid = validateCreateAttempt(attemptObject);
    expect(isInvalid).toBeNull();
  });
});

