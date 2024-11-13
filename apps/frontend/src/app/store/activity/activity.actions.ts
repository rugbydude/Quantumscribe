import { createAction, props } from '@ngrx/store';
import { ActivityLog } from '../../services/activity.service';

export const loadRecentActivity = createAction(
  '[Activity] Load Recent Activity',
  props<{ limit?: number }>()
);

export const loadRecentActivitySuccess = createAction(
  '[Activity] Load Recent Activity Success',
  props<{ activities: ActivityLog[] }>()
);

export const loadRecentActivityFailure = createAction(
  '[Activity] Load Recent Activity Failure',
  props<{ error: any }>()
);

export const logActivity = createAction(
  '[Activity] Log Activity',
  props<{ activity: Partial<ActivityLog> }>()
);

export const logActivitySuccess = createAction(
  '[Activity] Log Activity Success',
  props<{ activity: ActivityLog }>()
);

export const logActivityFailure = createAction(
  '[Activity] Log Activity Failure',
  props<{ error: any }>()
);
