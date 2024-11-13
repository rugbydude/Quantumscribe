import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import * as ProjectSelectors from '../../store/project/project.selectors';
import * as TaskSelectors from '../../store/task/task.selectors';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Projects -->
        <mat-card class="col-span-2">
          <mat-card-header>
            <mat-card-title>Recent Projects</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let project of recentProjects$ | async">
                <mat-icon matListItemIcon>folder</mat-icon>
                <div matListItemTitle>{{ project.name }}</div>
                <div matListItemLine>{{ project.description }}</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Tasks Overview -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>My Tasks</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="task-stats">
              <div class="stat-item">
                <span class="text-2xl font-bold">{{ (pendingTasks$ | async)?.length }}</span>
                <span class="text-gray-600">Pending</span>
              </div>
              <div class="stat-item">
                <span class="text-2xl font-bold">{{ (completedTasks$ | async)?.length }}</span>
                <span class="text-gray-600">Completed</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Activity Feed -->
        <mat-card class="col-span-3">
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-feed">
              <!-- Activity items will go here -->
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .task-stats {
      display: flex;
      justify-content: space-around;
      padding: 1rem 0;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .activity-feed {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class DashboardComponent implements OnInit {
  recentProjects$: Observable<Project[]>;
  pendingTasks$: Observable<Task[]>;
  completedTasks$: Observable<Task[]>;

  constructor(private store: Store) {
    this.recentProjects$ = this.store.select(ProjectSelectors.selectRecentProjects);
    this.pendingTasks$ = this.store.select(TaskSelectors.selectPendingTasks);
    this.completedTasks$ = this.store.select(TaskSelectors.selectCompletedTasks);
  }

  ngOnInit() {
    // Dispatch actions to load initial data
  }
}
