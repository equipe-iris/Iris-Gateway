import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostprocessProxyService } from './postprocess-proxy.service';

@ApiTags('gateway/files')
@ApiBearerAuth()
@Controller('gateway/files')
@UseGuards(AuthGuard('jwt'))
export class FilesProxyController {
  constructor(private svc: PostprocessProxyService) {}

  @Post('upload')
  @ApiBody({
    schema: {
      example: { name: 'report.zip' },
    },
  })
  @ApiResponse({ status: 200, description: 'File uploaded, returns file_id' })
  uploadFile(@Body() body: any) {
    return this.svc.uploadFile(body);
  }

  @Get('pending-files')
  getPendingFiles() {
    return this.svc.getPendingFiles();
  }

  @Get('processed-files')
  getProcessedFiles() {
    return this.svc.getProcessedFiles();
  }
}
