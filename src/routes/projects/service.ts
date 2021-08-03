import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project';
import { Repository } from 'typeorm';
import { CreateDto, EditDto } from './dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectService {

	constructor(
		@InjectRepository(Project)
		private projectsRepository: Repository<Project>,
	) { }


	async Create(data: CreateDto): Promise<Project | string> {
		const project: Project = this.projectsRepository.create(data)

		try {
			return this.projectsRepository.save(project)
		} catch (error) {
			return 'Something went wrong.'
		}
	}

	async Edit(id: string, data: EditDto) {
		const result = await this.projectsRepository.update({ _id: new ObjectId(id) }, data)
		console.log(result)
	}

	async FindAll(): Promise<Project[]> {
		return this.projectsRepository.find()
	}

	async Find(id: string): Promise<Project> {
		const project = await this.projectsRepository.findOne({ _id: new ObjectId(id) })
		console.log(project)
		return this.projectsRepository.findOne({ _id: new ObjectId(id) })
	}

	async Delete(id: string) {
		this.projectsRepository.delete({ _id: new ObjectId(id) })
	}

}
