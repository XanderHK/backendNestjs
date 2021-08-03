import { User } from "src/database/entities/user";

declare global{
    namespace Express {
        interface Request {
            user : User
        }
    }
}