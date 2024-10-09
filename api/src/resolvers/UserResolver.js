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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
const argon2 = __importStar(require("argon2"));
let UserResolver = class UserResolver {
    // Query to get all Users list
    async getUsers(context) {
        const user = context.user;
        if (!user) {
            throw new Error("User not authenticated");
        }
        const users = await User_1.User.find();
        const usersExceptCurrentUser = users.filter((user) => user.id !== context.user.id);
        return usersExceptCurrentUser;
    }
    // Mutation to update user's username and email
    async updateUser(context, email) {
        const user = context.user;
        if (!user)
            throw new Error(`The user is not connected`);
        // We check if the user exists
        const options = { where: { id: user.id } };
        const existingUser = await User_1.User.findOne(options);
        if (!existingUser)
            throw new Error("User not found!");
        console.log(existingUser);
        // Update email if provided
        if (email !== null && email !== undefined) {
            existingUser.email = email;
        }
        await existingUser.save();
        return existingUser;
    }
    // Mutation to delete an User
    async deleteUser(context) {
        const user = context.user;
        if (!user)
            throw new Error(`The user is not connected`);
        const options = { where: { id: user.id } };
        const existingUser = await User_1.User.findOne(options);
        if (!existingUser)
            throw new Error("User not found!");
        // Perform any additional checks here if needed
        // For example, only allow deletion if the user is an admin
        await existingUser.remove();
        return true;
    }
    // Mutation to update user's password
    async updatePassword(context, oldPassword, newPassword, confirmPassword) {
        const user = context.user;
        if (!user)
            throw new Error(`Utilisateur non connecté`);
        // Check if the user exists
        const options = { where: { id: user.id } };
        const existingUser = await User_1.User.findOne(options);
        if (!existingUser)
            throw new Error(`L'utilisateur n'existe pas`);
        //Verify old password with user's current password
        const valid = await argon2.verify(user.password, oldPassword);
        const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{7,}$/;
        if (!valid) {
            throw new Error("Mot de passe actuel incorrect");
        }
        if (!newPassword.match(passwordRules)) {
            throw new Error("Pour être valide,votre mot de passe doit contenir 7 caractères, une majuscule, une minuscule et un chiffre");
        }
        if (newPassword === oldPassword) {
            throw new Error("Le nouveau mot de passe doit être différent de l'actuel");
        }
        if (newPassword !== confirmPassword) {
            throw new Error("Le nouveau mot de passe et sa confirmation doivent être identiques");
        }
        existingUser.password = await argon2.hash(newPassword);
        await existingUser.save();
        return existingUser;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("email", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("oldPassword")),
    __param(2, (0, type_graphql_1.Arg)("newPassword")),
    __param(3, (0, type_graphql_1.Arg)("confirmPassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updatePassword", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
