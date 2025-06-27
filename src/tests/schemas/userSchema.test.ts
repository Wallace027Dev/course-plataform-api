import { describe, expect, it } from "@jest/globals";
import { validateCreateUser } from "../../schemas/UserSchema";

describe("Testing user schema", () => {
  const userObject = {
    name: "Name",
    email: "email@email.com",
    password: "password"
  };

  it("Should validate user", () => {
    const isInvalid = validateCreateUser(userObject);
    expect(isInvalid).toBeNull();
  });
});

