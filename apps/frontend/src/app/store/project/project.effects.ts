import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import * as ProjectActions from './project.actions';

@Injectable()
export class ProjectEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() => this.projectService.getProjects()
        .pipe(
          map(projects => ProjectActions.loadProjectsSuccess({ projects })),
          catchError(error => of(ProjectActions.loadProjectsFailure({ error })))
        ))
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.createProject),
      mergeMap(({ project }) => this.projectService.createProject(project)
        .pipe(
          map(newProject => ProjectActions.createProjectSuccess({ project: newProject })),
          catchError(error => of(ProjectActions.createProjectFailure({ error })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
