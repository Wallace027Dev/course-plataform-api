import { describe, expect, it } from "@jest/globals";
import { validateCreateResult } from "../../schemas/ResultSchema";

describe("Testing result schema", () => {
  const resultObject = {
    feedback: "Feedback",
    score: 1,
    attemptId: 1,
  };

  it("Should validate result", () => {
    const isInvalid = validateCreateResult(resultObject);
    expect(isInvalid).toBeNull();
  });
});

