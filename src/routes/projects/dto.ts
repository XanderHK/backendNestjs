import { IsNotEmpty, IsOptional, ValidateIf, IsEmail, IsString, ValidatorConstraint } from 'class-validator'


export class CreateDto {
    @IsNotEmpty()
    @IsString()
    projectName: string;

    @IsString()
    @IsNotEmpty()
    projectDescription: string;

    @IsString()
    @IsOptional()
    projectSiteUrl: string;

    @IsString()
    @IsOptional()
    projectGithubUrl: string;

    @IsString()
    @IsOptional()
    projectImageUrl: string
}


export class EditDto {
    @IsOptional()
    @IsString()
    projectName: string;

    @IsString()
    @IsOptional()
    projectDescription: string;

    @IsString()
    @IsOptional()
    projectSiteUrl: string;

    @IsString()
    @IsOptional()
    projectGithubUrl: string;

    @IsString()
    @IsOptional()
    projectImageUrl: string
}