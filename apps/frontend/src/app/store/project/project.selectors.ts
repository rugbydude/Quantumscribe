import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState, adapter } from './project.reducer';

export const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const {
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects,
} = adapter.getSelectors(selectProjectState);

export const selectProjectsLoading = createSelector(
  selectProjectState,
  (state: ProjectState) => state.loading
);

export const selectProjectsError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
);
