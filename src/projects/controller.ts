import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { CreateDto } from './dto';
import { ProjectService } from './service';
import { uploadToImgur } from 'src/utils/imgur.utils';

@Controller('/projects')
export class ProjectsController {
    constructor(private readonly projectService : ProjectService){}

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async CreateProject(@Body() body : CreateDto, @UploadedFile() file : Express.Multer.File) {
        const imgurUrl = await uploadToImgur(file)
        body.projectImageUrl = imgurUrl
        return this.projectService.Create(body);
    }

    @Get(':imgPath')
    async GetUploadedFile(@Param('imgPath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads' })
    }
}