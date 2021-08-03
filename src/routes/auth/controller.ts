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
		return this.authService.CreateUser(body)
	}

	@Post('/token')
	async Token(@Body() body: TokenDto): Promise<string> {
		const decodedJwt = verifyJwt(body.token)
		if (decodedJwt !== null) {
			return this.authService.RenewToken(decodedJwt)
		}
		return null
	}

	@Post('/token-expired')
	async TokenExpired(@Body() body: TokenDto) {
		const decodedJwt = verifyJwt(body.token)
		if (decodedJwt !== null) {
			return true
		}
		return false
	}
}