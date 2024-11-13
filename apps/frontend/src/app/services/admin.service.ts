import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { SystemStats } from '../models/system-stats.model';
import { environment } from '../../environments/environment';

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getSystemStats(): Observable<SystemStats> {
    return this.http.get<SystemStats>(`${this.apiUrl}/stats`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  updateUserRoles(userId: string, roles: string[]): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}/roles`, { roles });
  }

  deactivateUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }

  getRecentActivity(limit: number = 10): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.apiUrl}/activity`, {
      params: { limit: limit.toString() }
    });
  }
}
