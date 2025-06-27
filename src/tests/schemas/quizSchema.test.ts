import { describe, expect, it } from "@jest/globals";
import { validateCreateQuiz } from "../../schemas/QuizSchema";

describe("Testing quiz schema", () => {
  const quizObject = {
    name: "Name",
    questions: [
      {
        question: "Question 1?",
        explication: "The explication must be clear and answer the question",
        quizId: 1,
        answers: [
          { text: "Answer 1", correct: false, questionId: 1 },
          { text: "Answer 2", correct: true, questionId: 1 },
        ]
      },
      {
        question: "Question 2?",
        explication: "The explication must be clear and answer the question",
        quizId: 1,
        answers: [
          { text: "Answer 1", correct: false, questionId: 1 },
          { text: "Answer 2", correct: true, questionId: 1 },
        ]
      },
        {
          question: "Question 3?",
          explication: "The explication must be clear and answer the question",
          quizId: 1,
          answers: [
            { text: "Answer 1", correct: false, questionId: 1 },
            { text: "Answer 2", correct: true, questionId: 1 },
          ]
      },
    ]
  };

  it("Should validate quiz", () => {
    const isInvalid = validateCreateQuiz(quizObject);
    expect(isInvalid).toBeNull();
  });
});

