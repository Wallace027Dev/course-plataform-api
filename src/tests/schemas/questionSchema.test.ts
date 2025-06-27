import { describe, expect, it } from "@jest/globals";
import { validateCreateQuestion } from "../../schemas/QuestionSchema";

describe("Testing question schema", () => {
  const questionObject = {
    question: "Question?",
    explication: "The explication must be clear and answer the question",
    quizId: 1,
    answers: [
      { text: "Answer", correct: true, questionId: 1 },
      { text: "Answer", correct: true, questionId: 1 }
    ]
  };

  it("Should validate question", () => {
    const isInvalid = validateCreateQuestion(questionObject);
    expect(isInvalid).toBeNull();
  });
});

