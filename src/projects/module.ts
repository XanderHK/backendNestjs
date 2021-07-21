import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file.utils';
import { ProjectsController } from './controller';
import { ProjectService } from './service';

@Module({
  imports: [MulterModule.register({
    storage : diskStorage({
        destination: './uploads',
        filename: editFileName,
    }),
    fileFilter : imageFileFilter
  })],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectModule {}
