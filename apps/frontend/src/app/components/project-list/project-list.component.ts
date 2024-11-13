import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { AppState } from '../../store/app.state';
import * as ProjectActions from '../../store/project/project.actions';
import * as ProjectSelectors from '../../store/project/project.selectors';

@Component({
  selector: 'app-project-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Projects</h2>
        <button mat-raised-button color="primary" (click)="openCreateDialog()">
          Create Project
        </button>
      </div>

      <mat-progress-bar *ngIf="loading$ | async" mode="indeterminate">
      </mat-progress-bar>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <mat-card *ngFor="let project of projects$ | async" class="project-card">
          <mat-card-header>
            <mat-card-title>{{ project.name }}</mat-card-title>
            <mat-card-subtitle>{{ project.description }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Start Date: {{ project.startDate | date }}</p>
            <p>End Date: {{ project.endDate | date }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/projects', project.id]">
              View Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.projects$ = this.store.select(ProjectSelectors.selectAllProjects);
    this.loading$ = this.store.select(ProjectSelectors.selectProjectsLoading);
    this.error$ = this.store.select(ProjectSelectors.selectProjectsError);
  }

  ngOnInit() {
    this.store.dispatch(ProjectActions.loadProjects());
  }

  openCreateDialog() {
    // TODO: Implement dialog for project creation
  }
}
