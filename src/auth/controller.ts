import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './service';
import { LoginDto, RegisterDto, TokenDto } from './dto';
import { refreshJwt, signJwt } from 'src/jwt';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/login')
    async Login(@Body() body : LoginDto) {  
      const accessToken = signJwt(body)
      const refreshToken = refreshJwt(body)

      console.log(accessToken, refreshToken)
    }

    @Post('/register')
    async Register(@Body() body : RegisterDto) {
		this.authService.CreateUser(body)
    }

    @Post('/token')
    async Token(@Body() body : TokenDto) {
     console.log(body)
    }

    @Post('/token-expired')
    async TokenExpired(@Body() body : TokenDto) {
     console.log(body)
    }
}