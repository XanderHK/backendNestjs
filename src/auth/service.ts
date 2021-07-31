import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	  ) {}

    async CreateUser(data : RegisterDto) : Promise<User | string> {
		const salt = await bcrypt.genSalt(10)
		data.password = await bcrypt.hash(data.password, salt)
		const user = this.usersRepository.create(data)

		try {
			return await this.usersRepository.save(user)
		}catch(error) {
			return 'Something went wrong.'
		}
    }
}
