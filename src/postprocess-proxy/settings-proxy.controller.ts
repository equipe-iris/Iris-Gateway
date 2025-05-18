import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostprocessProxyService } from './postprocess-proxy.service';

@ApiTags('gateway/settings')
@ApiBearerAuth()
@Controller('gateway/settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsProxyController {
  constructor(private svc: PostprocessProxyService) { }

  @Get('ast-goal')
  getCards() {
    return this.svc.getAstGoal();
  }

  @Put('update-ast-goal')
  @ApiResponse({ status: 200, description: 'Updates the average service time goal, returns a message with the updated value' })
  updateAstGoal(@Body() body: any) {
    return this.svc.updateAstGoal(body);
  }
}
