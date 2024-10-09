"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDataSource = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const typeorm_1 = require("typeorm");
const path_1 = require("path");
require("dotenv").config();
const path = (0, path_1.join)(__dirname, "./models/*.ts");
const DBport = process.env.DB_PORT != null ? parseInt(process.env.DB_PORT, 10) : undefined;
// We check if DB_PORT is a number
if (typeof DBport === "number" && isNaN(DBport)) {
    // If conversion failed, exit
    console.error(`Invalid DB_PORT: ${DBport}`);
    process.exit();
}
// Create a new DataSource with the following configuration :
const dataSource = new typeorm_1.DataSource({
    // if we run backend without docker, the host has to be 'localhost'
    // if we run backend with docker, the host has to be 'postgres'
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: DBport,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path],
    synchronize: true,
});
exports.testDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    dropSchema: true,
    entities: [path],
});
exports.default = dataSource;
