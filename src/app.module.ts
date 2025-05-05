import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UsersProxyModule } from './users-proxy/users-proxy.module';
import { PostprocessProxyModule } from './postprocess-proxy/postprocess-proxy.module';
import { IaProxyModule } from './ia-proxy/ia-proxy.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UsersProxyModule,
    PostprocessProxyModule,
    IaProxyModule,
  ],
})
export class AppModule {}
