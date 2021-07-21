import { DB_HOST, DB_NAME, DB_PORT } from 'src/cfg'
import { createConnection, Connection } from 'typeorm'
import { User } from './entities/user'

export const connectDB = async () : Promise<Connection> =>  {
    return await createConnection({
        type: "mongodb",
        host: DB_HOST,
        port: Number(DB_PORT),
        database: DB_NAME,
        entities : [
            User
        ]
    })
}