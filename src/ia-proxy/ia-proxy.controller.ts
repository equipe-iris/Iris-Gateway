import {
  Controller,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IaProxyService } from './ia-proxy.service';

@ApiTags('ia-proxy')
@ApiBearerAuth()
@Controller('gateway')
@UseGuards(AuthGuard('jwt'))
export class IaProxyController {
  constructor(private readonly iaService: IaProxyService) {}

  @Post('predict')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('file', 10))
  async predict(
    @UploadedFiles() files: Express.Multer.File[],
    @Headers('authorization') authHeader: string,
  ) {
    return this.iaService.predict(files, authHeader);
  }
}
