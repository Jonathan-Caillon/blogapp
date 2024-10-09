"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const apollo_server_1 = require("apollo-server");
const dataSource_1 = __importDefault(require("./dataSource"));
const type_graphql_1 = require("type-graphql");
// import { join } from "path";
const User_1 = require("./models/User");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const UserResolver_1 = require("./resolvers/UserResolver");
const AuthResolver_1 = require("./resolvers/AuthResolver");
dotenv_1.default.config();
// const path = join(__dirname, "./models/*.ts");
const start = async () => {
    await dataSource_1.default.initialize();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver, AuthResolver_1.AuthResolver],
        authChecker: ({ context }) => {
            return context.user;
        },
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        context: async ({ req }) => {
            const token = req.headers.authorization?.split(" ")[1];
            if (token == null) {
                return { user: null };
            }
            try {
                const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
                const user = await User_1.User.findOne({ where: { id: payload.userId } });
                return { user };
            }
            catch (err) {
                return { user: null };
            }
        },
    });
    try {
        const { url } = await server.listen({
            port: process.env.BACKEND_PORT,
        });
        console.log(`Server ready at ${url}`);
    }
    catch {
        console.error("Error starting the server");
    }
};
void start();
