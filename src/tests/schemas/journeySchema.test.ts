import { describe, expect, it } from "@jest/globals";
import { validateCreateJourney } from "../../schemas/JourneySchema";

describe("Testing journey schema", () => {
  const journeyObject = {
    name: "Name",
    courseId: 1,
    coverUrl: "https://example.com/cover.jpg"
  };

  it("Should validate journey", () => {
    const isInvalid = validateCreateJourney(journeyObject);
    expect(isInvalid).toBeNull();
  });
});

