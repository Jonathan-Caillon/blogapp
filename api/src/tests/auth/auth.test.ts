import { AuthResolver } from "../../resolvers/AuthResolver";
import { testDataSource } from "../../dataSource";

describe("AuthResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  it("should create a new user", async () => {
    const newUser = await new AuthResolver().signUp(
      "test@example.com",
      "password"
    );

    expect(newUser.email).toBe("test@example.com");
  });

  it("should not create a user if the password is not strong enough", async () => {
    try {
      await new AuthResolver().signUp("johndoe@example.com", "123");
    } catch (error: any) {
      expect(error.message).toBe("Password must be at least 8 characters long");
    }
  });

  afterAll(async () => {
    // Close the connection to get better performance
    await testDataSource.destroy();
  });
});
