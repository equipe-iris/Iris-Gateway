import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('gateway/login')
@Controller('gateway/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({ summary: 'User login and JWT issuance' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'JWT token returned',
    schema: {
      example: {
        user: { id: 'uuid', name: 'John Doe', role: 'ADMIN' },
        token: 'eyJhbGciOiJIUzI1NiI...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
