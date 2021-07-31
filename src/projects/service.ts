import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project';
import { Repository } from 'typeorm';
import { CreateDto } from './dto';

@Injectable()
export class ProjectService {

	constructor(
			@InjectRepository(Project)
			private projectsRepository: Repository<Project>,
		) {}
	
	async Create(data : CreateDto) : Promise<Project | string> {
		const project : Project = this.projectsRepository.create(data)

		try {
			return await this.projectsRepository.save(project)
		}catch(error) {
			return 'Something went wrong.'
		}
	}

	async FindAll() : Promise<Project[]> {
		return await this.projectsRepository.find()
	}
	
}
