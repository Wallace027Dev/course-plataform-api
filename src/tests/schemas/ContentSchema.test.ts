import { describe, expect, it } from "@jest/globals";
import { validateCreateContent } from "../../schemas/ContentSchema";

describe("Testing content schema", () => {
  const contentObject = {
    journeyId: 1,
    title: "Title",
    order: 1,
    type: "video",
    quizId: null,
    metadata: {
      level: "Newbie",
      thumb: "https://example.com/thumb.jpg",
      contentType: "video"
      // Other information is optional
    }
  };

  it("Should validate content", () => {
    const isInvalid = validateCreateContent(contentObject);
    expect(isInvalid).toBeNull();
  });
});

