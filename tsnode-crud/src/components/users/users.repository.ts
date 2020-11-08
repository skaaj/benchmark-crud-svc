import { MongoRepository } from "typeorm";
import { User } from "./users.entity"

export class UserRepository extends MongoRepository<User> {}