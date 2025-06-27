import { describe, expect, it } from "@jest/globals";
import { validateCreateUserProgress } from "../../schemas/UserProgressSchema";

describe("Testing userProgress schema", () => {
  const userProgressObject = {
    userId: 1,
    contentId: 1,
    completedAt: new Date()
  };

  it("Should validate userProgress", () => {
    const isInvalid = validateCreateUserProgress(userProgressObject);
    expect(isInvalid).toBeNull();
  });
});

