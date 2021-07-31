import { IsNotEmpty, IsOptional, ValidateIf, IsEmail, IsString } from 'class-validator'


export class CreateDto {
    @IsNotEmpty()
    @IsString()
    projectName : string;

    @IsString()
    @IsNotEmpty()
    projectDescription : string;

    @IsString()
    @IsOptional()
    projectSiteUrl : string;
    
    @IsString()
    @IsOptional()
    projectGithubUrl : string;

    @IsString()
    @IsOptional()
    projectImageUrl : string
}
