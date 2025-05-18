import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { PostprocessProxyService } from './postprocess-proxy.service';
import { DashboardProxyController } from './dashboard-proxy.controller';
import { FilesProxyController } from './files-proxy.controller';
import { TicketsProxyController } from './tickets-proxy.controller';
import { SettingsProxyController } from './settings-proxy.controller';

@Module({
  imports: [HttpModule, AuthModule],
  providers: [PostprocessProxyService],
  controllers: [
    DashboardProxyController,
    FilesProxyController,
    TicketsProxyController,
    SettingsProxyController
  ],
  exports: [PostprocessProxyService],
})
export class PostprocessProxyModule {}
