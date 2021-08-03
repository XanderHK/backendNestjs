import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './service';
import { LoginDto, RegisterDto, TokenDto } from './dto';
import { User } from 'src/database/entities/user';
import { verifyJwt } from 'src/jwt';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/login')
	async Login(@Body() body: LoginDto) {
		return this.authService.Login(body)
	}

	@Post('/register')
	async Register(@Body() body: RegisterDto): Promise<User | string> {
		if(!new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(body.password)) {
			return (
				`Password must: 
				\r contain one lowercase character 
				\r contain one uppercase character 
				\r contain one numeric character 
				\r contain one special character 
				\r be atleast 8 characters long`
			)
		}

		const [isUnique, error] = await this.authService.UniqueUser(body)
		if(isUnique){
			const [user, error] = await this.authService.CreateUser(body)
			if(error){
				return error
			}
			return user
		}
		return error
	}

	@Post('/token')
	async TokenExtend(@Body() body: TokenDto): Promise<string> {
		const [user, error] = verifyJwt(body.token)
		if (user !== null) {
			const [renewedToken, error] : [string, string] = await this.authService.RenewToken(user)
			if(error){
				return error
			}
			return renewedToken
		}
		return error
	}

	@Post('/token-expired')
	async TokenExpired(@Body() body: TokenDto) {
		const [user, error] = verifyJwt(body.token)
		if (user !== null) {
			return true
		}
		return false
	}
}