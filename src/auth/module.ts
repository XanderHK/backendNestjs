import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
