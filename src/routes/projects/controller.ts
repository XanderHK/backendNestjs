import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res, Put, Delete, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { CreateDto, EditDto } from './dto';
import { ProjectService } from './service';
import { uploadToImgur } from 'src/utils/imgur.utils';

@Controller('/projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectService) { }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async CreateProject(@Body() body: CreateDto, @UploadedFile() file: Express.Multer.File, @Req() req: Express.Request) {
        const imgurUrl = await uploadToImgur(file)
        body.projectImageUrl = imgurUrl
        return this.projectService.Create(body);
    }

    @Put('/edit/:id')
    async EditProject(@Param('id') id : string, @Body() body: EditDto) {
        return this.projectService.Edit(id, body)
    }

    @Delete('/delete/:id')
    async DeleteProject(@Param('id') id : string, @Req() req: Express.Request) {
        return this.projectService.Delete(id)
    }

    @Get()
    async GetProjects() {
        return this.projectService.FindAll()
    }

    @Get(':id')
    async GetProject(@Param('id') id : string) {
        return this.projectService.Find(id)
    }

    @Get(':imgPath')
    async GetUploadedFile(@Param('imgPath') image : string, @Res() res) {
        return res.sendFile(image, { root: './uploads' })
    }
}