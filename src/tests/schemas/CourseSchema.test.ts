import { describe, expect, it } from "@jest/globals";
import { validateCreateCourse } from "../../schemas/CourseSchema";

describe("Testing course schema", () => {
  const courseObject = {
    name: "Name",
    description: "The description must be clear and answer the question",
    coverUrl: "https://example.com/cover.jpg"
  };

  it("Should validate course", () => {
    const isInvalid = validateCreateCourse(courseObject);
    expect(isInvalid).toBeNull();
  });
});

