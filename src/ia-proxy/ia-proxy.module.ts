import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PostprocessProxyModule } from '../postprocess-proxy/postprocess-proxy.module';
import { IaProxyService } from './ia-proxy.service';
import { IaProxyController } from './ia-proxy.controller';

@Module({
  imports: [AuthModule, PostprocessProxyModule],
  providers: [IaProxyService],
  controllers: [IaProxyController],
})
export class IaProxyModule {}
