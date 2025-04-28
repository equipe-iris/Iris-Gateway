import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersProxyService {
  private readonly baseUrl = process.env.GATEWAY_USER_SERVICE_URL;

  constructor(private readonly httpService: HttpService) {}

  private async request(
    method: string,
    path: string,
    data?: any,
    authHeader?: string,
  ): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const headers = { authorization: authHeader };
    const response$ = this.httpService
      .request({ method, url, data, headers })
      .pipe(map((res) => res.data));
    return lastValueFrom(response$);
  }

  getAll(authHeader: string) {
    return this.request('GET', '/users', null, authHeader);
  }

  getOne(id: string, authHeader: string) {
    return this.request('GET', `/users/${id}`, null, authHeader);
  }

  create(data: any, authHeader: string) {
    return this.request('POST', '/users', data, authHeader);
  }

  update(id: string, data: any, authHeader: string) {
    return this.request('PUT', `/users/${id}`, data, authHeader);
  }

  remove(id: string, authHeader: string) {
    return this.request('DELETE', `/users/${id}`, null, authHeader);
  }
}
