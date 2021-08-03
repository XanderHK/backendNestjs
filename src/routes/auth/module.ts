import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/database/entities/token';
import { User } from 'src/database/entities/user';
import { AuthController } from './controller';
import { AuthService } from './service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Token])],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule { }
