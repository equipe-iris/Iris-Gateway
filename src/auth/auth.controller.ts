import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login and JWT issuance' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'JWT token returned',
    schema: { example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI...', id: 'oreoivbroeiv...', name: 'Pedro Alvis', role: 'ADMIN'} },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
