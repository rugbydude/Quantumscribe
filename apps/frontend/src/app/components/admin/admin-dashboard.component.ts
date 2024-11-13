import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { SystemStats } from '../../models/system-stats.model';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-card *ngIf="stats$ | async as stats">
          <mat-card-header>
            <mat-card-title>System Overview</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="grid grid-cols-2 gap-4">
              <div *ngFor="let stat of getStats(stats)" class="text-center">
                <div class="text-2xl font-bold">{{stat.value}}</div>
                <div class="text-gray-600">{{formatLabel(stat.key)}}</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let activity of recentActivity$ | async">
                <mat-icon matListIcon>{{getActivityIcon(activity.type)}}</mat-icon>
                <div matLine>{{activity.description}}</div>
                <div matLine>{{activity.timestamp | date:'short'}}</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats$: Observable<SystemStats>;
  recentActivity$: Observable<any[]>;

  constructor(private adminService: AdminService) {
    this.stats$ = this.adminService.getSystemStats();
    this.recentActivity$ = this.adminService.getRecentActivity();
  }

  ngOnInit() {}

  getStats(stats: SystemStats): Array<{key: string, value: number}> {
    return Object.entries(stats).map(([key, value]) => ({key, value}));
  }

  formatLabel(key: string): string {
    return key.split(/(?=[A-Z])/).join(' ');
  }

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      'USER_LOGIN': 'login',
      'PROJECT_CREATED': 'add_circle',
      'TASK_COMPLETED': 'check_circle',
      'USER_REGISTERED': 'person_add'
    };
    return icons[type] || 'info';
  }
}
