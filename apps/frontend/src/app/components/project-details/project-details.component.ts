import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import * as ProjectActions from '../../store/project/project.actions';
import * as ProjectSelectors from '../../store/project/project.selectors';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="container mx-auto p-4" *ngIf="project$ | async as project">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ project.name }}</h2>
        <div class="flex gap-2">
          <button mat-raised-button color="primary" (click)="editProject()">
            Edit Project
          </button>
          <button mat-raised-button color="warn" (click)="deleteProject()">
            Delete Project
          </button>
        </div>
      </div>

      <mat-card class="mb-6">
        <mat-card-content>
          <p class="text-gray-600">{{ project.description }}</p>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p class="font-semibold">Start Date</p>
              <p>{{ project.startDate | date }}</p>
            </div>
            <div>
              <p class="font-semibold">End Date</p>
              <p>{{ project.endDate | date }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Project Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Tasks</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="text-center">
              <p class="text-3xl font-bold">{{ project.tasks?.length || 0 }}</p>
              <p class="text-gray-600">Total Tasks</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Progress</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="text-center">
              <mat-progress-circle
                mode="determinate"
                [value]="projectProgress"
                diameter="60">
              </mat-progress-circle>
              <p class="text-gray-600">Complete</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Team Members</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="text-center">
              <p class="text-3xl font-bold">{{ project.teamMembers?.length || 0 }}</p>
              <p class="text-gray-600">Members</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tabs for different project views -->
      <mat-tab-group>
        <mat-tab label="Tasks">
          <app-task-board [projectId]="project.id"></app-task-board>
        </mat-tab>
        <mat-tab label="Team">
          <app-team-list [projectId]="project.id"></app-team-list>
        </mat-tab>
        <mat-tab label="Documents">
          <app-document-list [projectId]="project.id"></app-document-list>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .mat-progress-circle {
      margin: 0 auto;
    }
  `]
})
export class ProjectDetailsComponent implements OnInit {
  project$: Observable<Project>;
  projectProgress: number = 0;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.store.dispatch(ProjectActions.loadProject({ id: projectId }));
      this.project$ = this.store.select(ProjectSelectors.selectCurrentProject);
      
      // Calculate project progress
      this.project$.subscribe(project => {
        if (project && project.tasks) {
          const completedTasks = project.tasks.filter(task => task.status === 'DONE').length;
          this.projectProgress = (completedTasks / project.tasks.length) * 100;
        }
      });
    }
  }

  editProject() {
    // TODO: Implement edit project dialog
  }

  deleteProject() {
    // TODO: Implement delete project confirmation dialog
  }
}
