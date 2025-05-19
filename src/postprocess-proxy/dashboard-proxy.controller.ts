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
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getCategories(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getCategories(start, end);
  }

  @Get('emotions')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getEmotions(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getEmotions(start, end);
  }

  @Get('daily-emotion')
  @ApiQuery({ name: 'start_date', required: true, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'end_date', required: true, description: 'YYYY-MM-DD' })
  getDailyEmotion(
    @Query('start_date') start: string,
    @Query('end_date') end: string,
  ) {
    return this.svc.getDailyEmotion(start, end);
  }

  @Get('average-service-time')
  @ApiQuery({
    name: 'months',
    required: true,
    description: 'int describing the number of months. 0 for all time',
  })
  getAverageServiceTime(@Query('months') months: number) {
    return this.svc.getAverageServiceTime(months);
  }

  @Get('open-tickets')
  getOpenTickets() {
    return this.svc.getOpenTickets();
  }
}
