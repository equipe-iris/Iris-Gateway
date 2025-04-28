import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersProxyService } from './users-proxy.service';
import { UsersProxyController } from './users-proxy.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  providers: [UsersProxyService],
  controllers: [UsersProxyController],
})
export class UsersProxyModule {}
