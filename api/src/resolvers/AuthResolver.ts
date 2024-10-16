import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { User } from "../models/User";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthResolver {
  // Mutation to create a new user
  @Mutation(() => User)
  async signUp(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    if (email === null || password === null) {
      throw new Error("All fields are required");
    }
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{7,}$/;

    if (!password.match(passwordRules)) {
      throw new Error(
        "Pour être valide,votre mot de passe doit contenir 7 caractères, une majuscule, une minuscule et un chiffre"
      );
    }

    // We hash the password send by the user with argon2 and store it in the database
    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    }).save();

    return newUser;
  }

  // Query to connect a user and return a token
  @Query(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    // We check if the user exists in the database with his email
    const userFoundByEmail = await User.findOne({
      where: { email },
    });
    if (userFoundByEmail == null) {
      throw new Error("Invalid credentials");
    }

    // We check if the password is valid
    const validPassword = await argon2.verify(
      userFoundByEmail.password,
      password
    );
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    // If the user exists and the password is valid, we return a token
    const payload = { userId: userFoundByEmail.id };
    const token = sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_TIMING,
    });
    return token;
  }

  @Authorized()
  @Query(() => User)
  async getProfile(@Ctx() context: any): Promise<Boolean> {
    const user = context.user;

    if (user === null) throw new Error(`The user is not connected`);

    return context.user;
  }
}
