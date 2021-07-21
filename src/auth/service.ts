import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user';
import { getMongoManager } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {

    async CreateUser(data : RegisterDto) {
		const salt = await bcrypt.genSalt(10);
		const user = new User()
		user.name = data.name
		user.email = data.email
		user.password = await bcrypt.hash(data.password, salt)
   
		const manager = getMongoManager();
		await manager.save(user)
    }
}
