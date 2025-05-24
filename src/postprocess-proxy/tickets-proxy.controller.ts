import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostprocessProxyService } from './postprocess-proxy.service';

@ApiTags('gateway/tickets')
@ApiBearerAuth()
@Controller('gateway/tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsProxyController {
  constructor(private svc: PostprocessProxyService) {}

  @Get('processed-tickets')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getProcessedTickets(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getProcessedTickets(start, end);
  }

  @Get('open-tickets')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getOpenTickets(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getOpenTickets(start, end);
  }

  @Get('closed-tickets')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getClosedTickets(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getClosedTickets(start, end);
  }

  @Get('tickets-by-emotion')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'emotion', required: true, description: 'Emotion' })
  getTicketsByEmotion(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
    @Query('emotion') emotion: string,
  ) {
    return this.svc.getTicketsByEmotion(start, end, emotion);
  }

  @Get('tickets-by-category')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'category', required: true, description: 'Category' })
  getTicketsByCtegory(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
    @Query('category') category: string,
  ) {
    return this.svc.getTicketsByCategory(start, end, category);
  }

  @Get('tickets-by-month')
  @ApiQuery({ name: 'month', required: true, description: 'MM/YYYY' })
  getTicketsByMonth(@Query('month') month: string) {
    return this.svc.getTicketsByMonth(month);
  }
}
