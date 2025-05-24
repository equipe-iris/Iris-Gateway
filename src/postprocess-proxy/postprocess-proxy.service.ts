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
  getTotalTickets() {
    return this.request('get', '/dashboard/total-tickets');
  }
  getTicketsByDate(date: string) {
    return this.request(
      'get',
      `/dashboard/tickets?date=${encodeURIComponent(date)}`,
    );
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
  getDailyTickets(start: string, end: string) {
    return this.request(
      'get',
      `/dashboard/daily-tickets?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
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
  getProcessedTickets(start: string, end: string) {
    return this.request(
      'get',
      `/tickets/processed-tickets?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getOpenTickets(start: string, end: string) {
    return this.request(
      'get',
      `/tickets/open-tickets?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getClosedTickets(start: string, end: string) {
    return this.request(
      'get',
      `/tickets/closed-tickets?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`,
    );
  }
  getTicketsByEmotion(start: string, end: string, emotion: string) {
    return this.request(
      'get',
      `/tickets/tickets-by-emotion?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}&emotion=${encodeURIComponent(emotion)}`,
    );
  }
  getTicketsByCategory(start: string, end: string, category: string) {
    return this.request(
      'get',
      `/tickets/tickets-by-category?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}&category=${encodeURIComponent(category)}`,
    );
  }
  getTicketsByMonth(month: string) {
    return this.request(
      'get',
      `/tickets/tickets-by-month?month=${encodeURIComponent(month)}`,
    );
  }

  // Settings
  getAstGoal() {
    return this.request('get', '/settings/ast-goal');
  }

  updateAstGoal(body: any) {
    return this.request('put', '/settings/update-ast-goal', body);
  }
}
