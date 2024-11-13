import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  userId: string;
  timestamp: Date;
  metadata?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly API_URL = '/api/activity';

  constructor(private http: HttpClient) {}

  logActivity(activity: Partial<ActivityLog>): Observable<ActivityLog> {
    return this.http.post<ActivityLog>(`${this.API_URL}/log`, activity);
  }

  getRecentActivity(limit: number = 10): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.API_URL}/recent`, {
      params: { limit: limit.toString() }
    });
  }

  getUserActivity(userId: string): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.API_URL}/user/${userId}`);
  }

  getProjectActivity(projectId: string): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.API_URL}/project/${projectId}`);
  }

  getActivityStats(timeframe: 'day' | 'week' | 'month'): Observable<any> {
    return this.http.get(`${this.API_URL}/stats/${timeframe}`);
  }
}
