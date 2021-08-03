import { IsNotEmpty, IsOptional, ValidateIf, IsEmail } from 'class-validator'

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}


export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;
}

export class TokenDto {
    @IsNotEmpty()
    token: string;
}