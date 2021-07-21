import { IsNotEmpty, IsOptional, ValidateIf, IsEmail } from 'class-validator'


export class CreateDto {
    @IsNotEmpty()
    projectName : string;

    @IsNotEmpty()
    projectDescription : string;

    @IsOptional()
    projectSiteUrl : string;
    
    @IsOptional()
    projectGithubUrl : string;
}
