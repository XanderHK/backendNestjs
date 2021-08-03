import * as JWT from 'jsonwebtoken'
import { JWT_TOKEN_EXPIRATION_TIME, JWT_SECRET, REFRESH_TOKEN_SECRET } from './cfg'
import { User } from './database/entities/user'

export const signJwt = (data : any) : string => {
    return JWT.sign(JSON.parse(JSON.stringify(data)), JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRATION_TIME})
}

export const refreshJwt = (data : any) : string => {
    return JWT.sign(JSON.parse(JSON.stringify(data)), REFRESH_TOKEN_SECRET)
}

export const verifyJwt = (jwt : string) : [User, string] =>  {
    try {
        const contents = JWT.verify(jwt, JWT_SECRET)
        if (contents) { 
            return [contents, null]
        }
        return [null, 'Invalid token.']
    } catch(e) {
        console.log(e)
        return [null, e]
    }
}