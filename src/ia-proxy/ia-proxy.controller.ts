import {
  Controller,
  Post,
  Get,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Headers,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @Get('semantic-search')
  @ApiOperation({ summary: 'Perform semantic search on tickets' })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'Search query string',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of tickets matching the search query',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - missing or invalid query parameter',
  })
  async semanticSearch(
    @Query('query') query: string,
  ) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    
    return this.iaService.semanticSearch(query);
  }
}
