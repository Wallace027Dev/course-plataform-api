import { describe, expect, it } from "@jest/globals";
import { validateCreateAnswer } from "../../schemas/AnswerSchema";

describe("Testing answer schema", () => {
  const answerObject = {
    text: "Text",
    correct: true,
    questionId: 1
  };

  it("Should validate answer", () => {
    const isInvalid = validateCreateAnswer(answerObject);
    expect(isInvalid).toBeNull();
  });
});

