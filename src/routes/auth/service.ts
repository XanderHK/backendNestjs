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

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	async CreateUser(data: RegisterDto): Promise<[User, string]> {
		try {
			const salt : string = await bcrypt.genSalt(10)
			data.password = await bcrypt.hash(data.password, salt)
			const user : User = this.usersRepository.create(data)
			const savedUser : User = await this.usersRepository.save(user)
			return [savedUser, null]
		} catch (error) {
			return [null, error]
		}
	}

	/**
	 * 
	 * @param user 
	 * @returns 
	 */
	async RenewToken(user : User): Promise<[string, string]> {
		try {
			const refreshToken: Token = await this.tokensRepository.findOne({ userId: new ObjectId(user._id) })
			if (refreshToken) {
				const newToken : string =  signJwt({
					id: user._id,
					name: user.name,
					email: user.email,
					password: user.password
				})
				return [newToken, null]
			}
			return [null, 'Couldn\'t find refresh token']
		} catch (error) {
			return [null, error]
		}
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	async Login(data: LoginDto): Promise<[string, string]> {
		try{
			const user: User = await this.usersRepository.findOne({ email: data.email })
			if(user){
				const validPwd : boolean = await bcrypt.compare(data.password, user.password)
				if(validPwd){
					try{
						const accessToken : string = signJwt(user)
						const refreshToken : string = refreshJwt(user)
						const checkIfExists : Token = await this.tokensRepository.findOne({ userId: user._id })

						if (checkIfExists) await this.tokensRepository.delete({ userId: user._id }).catch(err => console.log(err))

						const newRefreshToken: Token = this.tokensRepository.create({ userId: user._id, token: refreshToken })
						this.tokensRepository.save(newRefreshToken)
						return [accessToken, null]
					}catch(error){
						return [null, error]
					}
				}
				return [null, 'Password doesn\'t match.']
			}
			return [null, 'No user found associated with included email.']
		}catch(error){
			return [null, error]
		}
	}

	/**
	 * 
	 * @param body 
	 * @returns 
	 */
	async UniqueUser(body: RegisterDto) : Promise<[boolean, string]> { 
		try{
			const result : User = await this.usersRepository.findOne({email : body.email})
			if(result) { 
				return [false, null]
			}
			return [true, 'Email is already in use']
		}catch(error) {
			return [null, error]
		}
	}
}
