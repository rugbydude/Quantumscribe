import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '../../models/project.model';
import * as ProjectActions from './project.actions';

export interface ProjectState extends EntityState<Project> {
  loading: boolean;
  error: Error | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectState = adapter.getInitialState({
  loading: false,
  error: null
});

export const projectReducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => 
    adapter.setAll(projects, { ...state, loading: false })
  ),
  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProjectActions.createProjectSuccess, (state, { project }) =>
    adapter.addOne(project, state)
  )
);
