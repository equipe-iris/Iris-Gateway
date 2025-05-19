import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PostprocessProxyService {
  private readonly baseUrl = process.env.GATEWAY_POST_PROCESS_URL;

  constructor(private readonly http: HttpService) {}

  private request(method: 'get' | 'post' | 'put', path: string, data?: any) {
    const url = `${this.baseUrl}${path}`;
    const obs = this.http
      .request({ method, url, data })
      .pipe(map((res) => res.data));
    return lastValueFrom(obs);
  }

  // Dashboard
  getCards() {
    return this.request('get', '/dashboard/cards');
  }
  getCategories(start: string, end: string) {
    return this.request(
      'get',
      `/dashboard/categories?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getEmotions(start: string, end: string) {
    return this.request(
      'get',
      `/dashboard/emotions?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getDailyEmotion(start: string, end: string) {
    return this.request(
      'get',
      `/dashboard/daily-emotion?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getAverageServiceTime(months: number) {
    return this.request(
      'get',
      `/dashboard/average-service-time?months=${encodeURIComponent(months)}`,
    );
  }
  getOpenTickets() {
    return this.request('get', '/dashboard/open-tickets');
  }

  // Files
  uploadFile(body: any) {
    return this.request('post', '/files/upload', body);
  }
  getPendingFiles() {
    return this.request('get', '/files/pending-files');
  }
  getProcessedFiles() {
    return this.request('get', '/files/processed-files');
  }

  // Tickets
  getProcessedTickets() {
    return this.request('get', '/tickets/processed-tickets');
  }

  // Settings
  getAstGoal() {
    return this.request('get', '/settings/ast-goal');
  }

  updateAstGoal(body: any) {
    return this.request('put', '/settings/update-ast-goal', body);
  }
}
