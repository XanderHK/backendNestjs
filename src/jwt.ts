import * as JWT from 'jsonwebtoken'
import { JWT_TOKEN_EXPIRATION_TIME, JWT_SECRET, REFRESH_TOKEN_SECRET } from './cfg'

export const signJwt = (data : any) : string => {
    return JWT.sign(data, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRATION_TIME})
}

export const refreshJwt = (data : any) : string => {
    return JWT.sign(data, REFRESH_TOKEN_SECRET)
}

export const verifyJwt = (jwt : string) : (string | null) =>  {
    try {
        JWT.verify(jwt, JWT_SECRET)
        return JWT.decode(jwt)
    } catch(e) {
        return null
    }
}