import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Notification } from "./entities/notification";
import {config} from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Notification],
    migrations: [],
    subscribers: [],
})
