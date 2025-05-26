import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UsersProxyService } from './users-proxy.service';

@ApiTags('gateway/users')
@ApiBearerAuth()
@Controller('gateway/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
export class UsersProxyController {
  constructor(private readonly usersProxyService: UsersProxyService) {}

  @Get()
  getAll(@Headers('authorization') authHeader: string) {
    return this.usersProxyService.getAll(authHeader);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersProxyService.getOne(id, authHeader);
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') authHeader: string) {
    return this.usersProxyService.create(body, authHeader);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersProxyService.update(id, body, authHeader);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    return this.usersProxyService.remove(id, authHeader);
  }
}
