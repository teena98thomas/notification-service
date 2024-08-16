
import { User } from "../entities/user";
import { AppDataSource } from "../data-source";

export const UserRepository = AppDataSource.getRepository(User)