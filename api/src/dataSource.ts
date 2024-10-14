/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from "typeorm";
import { join } from "path";

require("dotenv").config();
const path = join(__dirname, "./models/*.ts");
const DBport =
  process.env.DB_PORT != null ? parseInt(process.env.DB_PORT, 10) : undefined;

// We check if DB_PORT is a number
if (typeof DBport === "number" && isNaN(DBport)) {
  // If conversion failed, exit
  console.error(`Invalid DB_PORT: ${DBport}`);
  process.exit();
}

// Create a new DataSource with the following configuration :
export const dataSource = new DataSource({
  // if we run backend without docker, the host has to be 'localhost'
  // if we run backend with docker, the host has to be 'postgres'
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: DBport,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  entities: [path],
  synchronize: true,
});

export const testDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5433,
  username: "test",
  password: "test",
  database: "postgres",

  synchronize: true,
  dropSchema: true,

  entities: [path],
});
