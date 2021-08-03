import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project';
import { AuthenticateJwtMiddleware } from 'src/middleware/authenticateJwt';
import { storage } from 'src/multer';
import { ProjectsController } from './controller';
import { ProjectService } from './service';

@Module({
	imports: [storage(), TypeOrmModule.forFeature([Project])],
	controllers: [ProjectsController],
	providers: [ProjectService],
})
export class ProjectModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthenticateJwtMiddleware)
			.exclude(
				{ path: 'projects', method: RequestMethod.GET },
				{ path: 'projects/(.*)', method: RequestMethod.GET }
			)
			.forRoutes(ProjectsController)
	}
}
