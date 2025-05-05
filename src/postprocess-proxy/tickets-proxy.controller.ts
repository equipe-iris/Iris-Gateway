import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostprocessProxyService } from './postprocess-proxy.service';

@ApiTags('gateway/tickets')
@ApiBearerAuth()
@Controller('gateway/tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsProxyController {
  constructor(private svc: PostprocessProxyService) {}

  @Get('processed-tickets')
  @ApiResponse({ status: 200, description: 'List of processed tickets' })
  getProcessedTickets() {
    return this.svc.getProcessedTickets();
  }
}
