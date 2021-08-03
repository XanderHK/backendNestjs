import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user';
import { LoginDto, RegisterDto } from './dto';
import { refreshJwt, signJwt } from 'src/jwt';
import { Token } from 'src/database/entities/token';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(Token)
		private tokensRepository: Repository<Token>,
	) { }

	async CreateUser(data: RegisterDto): Promise<User | string> {
		const salt = await bcrypt.genSalt(10)
		data.password = await bcrypt.hash(data.password, salt)
		const user = this.usersRepository.create(data)

		try {
			return this.usersRepository.save(user)
		} catch (error) {
			return 'Something went wrong.'
		}
	}

	async RenewToken(user): Promise<string> {
		try {
			const refreshToken: Token = await this.tokensRepository.findOne({ userId: new ObjectId(user._id) })
			if (refreshToken) {
				return signJwt({
					id: user._id,
					name: user.name,
					email: user.email,
					password: user.password
				})
			}
			return null
		} catch (error) {
			return error
		}
	}

	async Login(data: LoginDto): Promise<string> {
		try {
			const user: User = await this.usersRepository.findOne({ email: data.email })
			if (user) {
				const validPwd = await bcrypt.compare(data.password, user.password)
				if (validPwd) {
					const accessToken = signJwt(user)
					const refreshToken = refreshJwt(user)
					const checkIfExists = await this.tokensRepository.findOne({ userId: user._id })

					if (checkIfExists) await this.tokensRepository.delete({ userId: user._id })

					const newToken: Token = this.tokensRepository.create({ userId: user._id, token: refreshToken })
					try {
						this.tokensRepository.save(newToken)
						return accessToken
					} catch (error) {
						return error
					}
				}
			}
		} catch (error) {
			return error
		}
	}
}
