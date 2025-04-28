import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UsersProxyModule } from './users-proxy/users-proxy.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UsersProxyModule,
  ],
})
export class AppModule {}
