import { Express } from 'express'
import axios, { AxiosResponse } from 'axios';
import * as FormData from "form-data"
import * as fs from 'fs'
import { IMGUR_ID } from 'src/cfg';

export async function uploadToImgur(file : Express.Multer.File) : Promise<string> {
    const location : string = `uploads/${file.filename}`
    const data : FormData = new FormData()

    data.append('image', fs.createReadStream(location))

    const config : { headers : { Authorization : string } } = {
        headers: { 
            Authorization: `Client-ID ${IMGUR_ID}`,
            ...data.getHeaders() 
        }
    }

    const url : string = 'https://api.imgur.com/3/upload'

    const response : string = await axios.post(url, data, config)
    .then(res => res.data.data.link)
    .catch(err => err)

    fs.unlinkSync(location)

    return response
}