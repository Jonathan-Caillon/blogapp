"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
const argon2 = __importStar(require("argon2"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthResolver {
    // Mutation to create a new user
    async signUp(email, password) {
        if (email === null || password === null) {
            throw new Error("All fields are required");
        }
        // We hash the password send by the user with argon2 and store it in the database
        const hashedPassword = await argon2.hash(password);
        const newUser = await User_1.User.create({
            email,
            password: hashedPassword,
        }).save();
        return newUser;
    }
    // Query to connect a user and return a token
    async signIn(email, password) {
        // We check if the user exists in the database with his email
        const userFoundByEmail = await User_1.User.findOne({
            where: { email },
        });
        if (userFoundByEmail == null) {
            throw new Error("Invalid credentials");
        }
        // We check if the password is valid
        const validPassword = await argon2.verify(userFoundByEmail.password, password);
        if (!validPassword) {
            throw new Error("Invalid credentials");
        }
        // If the user exists and the password is valid, we return a token
        const payload = { userId: userFoundByEmail.id };
        const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMING,
        });
        return token;
    }
    async getProfile(context) {
        const user = context.user;
        if (user === null)
            throw new Error(`The user is not connected`);
        return context.user;
    }
}
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(() => User_1.User),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getProfile", null);
exports.AuthResolver = AuthResolver;
