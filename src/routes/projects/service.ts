import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDto, EditDto } from './dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectService {

	constructor(
		@InjectRepository(Project)
		private projectsRepository: Repository<Project>,
	) { }

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	async Create(data: CreateDto): Promise<[Project, string]> {
		try {
			const project: Project = this.projectsRepository.create(data)
			const savedProject : Project = await this.projectsRepository.save(project);
			return [savedProject, null]
		} catch (error) {
			return [null, error]
		}
	}

	/**
	 * 
	 * @param id 
	 * @param data 
	 * @returns 
	 */
	async Edit(id: string, data: EditDto) : Promise<[number, string]> {
		try{
			const result : UpdateResult = await this.projectsRepository.update({ _id: new ObjectId(id) }, data)
			return [result.raw.result.ok, null]
		}catch(error){
			return [null, error]
		}
	}

	/**
	 * 
	 * @returns 
	 */
	async FindAll(): Promise<[Project[], string]> {
		try{
			const projects : Project[] = await this.projectsRepository.find()
			return [projects, null]
		}catch(error){
			return [null, error]
		}
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	async Find(id: string): Promise<[Project, string]> {
		try{
			const project = await this.projectsRepository.findOne({ _id: new ObjectId(id) })
			return [project, null]
		}catch(error){
			return [null, error]
		}
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	async Delete(id: string) : Promise<[number, string]> {
		try{
			const result : DeleteResult = await this.projectsRepository.delete({ _id: new ObjectId(id) })
			return [result.raw.result.ok, null]
		}catch(error){
			return [null, error]
		}
	}

}
