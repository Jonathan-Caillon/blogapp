import { AuthResolver } from "../../resolvers/AuthResolver";
import { testDataSource } from "../../dataSource";

describe("AuthResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  it("should create a new user", async () => {
    const newUser = await new AuthResolver().signUp(
      "test@example.com",
      "Password123"
    );

    expect(newUser.email).toBe("test@example.com");
  });

  it("should not create a user if the password is not strong enough", async () => {
    try {
      await new AuthResolver().signUp("johndoe@example.com", "123");
    } catch (error: any) {
      expect(error.message).toBe(
        "Pour être valide,votre mot de passe doit contenir 7 caractères, une majuscule, une minuscule et un chiffre"
      );
    }
  });

  afterAll(async () => {
    // Close the connection to get better performance
    await testDataSource.destroy();
  });
});
