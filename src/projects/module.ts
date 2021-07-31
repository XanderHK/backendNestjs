import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project';
import { storage } from 'src/multer';
import { ProjectsController } from './controller';
import { ProjectService } from './service';

@Module({
  imports: [storage(), TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectModule {}
