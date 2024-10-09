"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthResolver_1 = require("../../resolvers/AuthResolver");
const dataSource_1 = require("../../dataSource");
describe("AuthResolver", () => {
    beforeAll(async () => {
        await dataSource_1.testDataSource.initialize();
    });
    it("should create a new user", async () => {
        const newUser = await new AuthResolver_1.AuthResolver().signUp("test@example.com", "password");
        expect(newUser.email).toBe("test@example.com");
    });
    it("should not create a user if the password is not strong enough", async () => {
        try {
            await new AuthResolver_1.AuthResolver().signUp("johndoe@example.com", "123");
        }
        catch (error) {
            expect(error.message).toBe("Password must be at least 8 characters long");
        }
    });
    afterAll(async () => {
        // Close the connection to get better performance
        await dataSource_1.testDataSource.destroy();
    });
});
