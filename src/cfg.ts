require('dotenv').config()

export const JWT_SECRET = process.env.JWT_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const JWT_TOKEN_EXPIRATION_TIME = process.env.JWT_TOKEN_EXPIRATION_TIME
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = Number(process.env.DB_PORT)
export const IMGUR_ID = process.env.IMGUR_ID
export const PORT = Number(process.env.PORT)