import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostprocessProxyService } from './postprocess-proxy.service';

@ApiTags('gateway/dashboard')
@ApiBearerAuth()
@Controller('gateway/dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardProxyController {
  constructor(private svc: PostprocessProxyService) {}

  @Get('cards')
  getCards() {
    return this.svc.getCards();
  }

  @Get('categories')
  getCategories() {
    return this.svc.getCategories();
  }

  @Get('satisfaction-score')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getSatisfactionScore(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getSatisfactionScore(start, end);
  }

  @Get('daily-satisfaction')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getDailySatisfaction(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getDailySatisfaction(start, end);
  }

  @Get('average-service-time')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getAverageServiceTime(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getAverageServiceTime(start, end);
  }

  @Get('open-tickets')
  getOpenTickets() {
    return this.svc.getOpenTickets();
  }
}
