import { DynamicModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_HOST, DB_NAME, DB_PORT } from 'src/cfg'
import { Project } from "./entities/project";
import { User } from "./entities/user";

export function dbConnect() : DynamicModule {
      return TypeOrmModule.forRoot({
        type: "mongodb",
        host: DB_HOST,
        port: Number(DB_PORT),
        database: DB_NAME,
        entities: [
            User,
            Project
        ],
        synchronize: true,
      })
  }