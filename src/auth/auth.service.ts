import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom, map } from 'rxjs';
import { LoginDto } from './dto/login.dto';

interface ValidateResponse {
  id: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  private readonly userServiceUrl = process.env.GATEWAY_USER_SERVICE_URL;

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{
    user: { id: string; name: string; role: string };
    token: string;
  }> {
    let validateRes: ValidateResponse;
  
    try {
      const validate$ = this.httpService
        .post<ValidateResponse>(
          `${this.userServiceUrl}/auth/validate`,
          dto,
        )
        .pipe(map(res => res.data));
  
      validateRes = await lastValueFrom(validate$);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid credentials', err);
    }
  
    const { id, role, name } = validateRes;
    const token = this.jwtService.sign({ sub: id, role });
  
    return {
      user: { id, name, role },
      token,
    };
  }
}
