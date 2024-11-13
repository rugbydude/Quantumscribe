import { createReducer, on } from '@ngrx/store';
import { ActivityLog } from '../../services/activity.service';
import * as ActivityActions from './activity.actions';

export interface ActivityState {
  recentActivities: ActivityLog[];
  loading: boolean;
  error: any;
}

export const initialState: ActivityState = {
  recentActivities: [],
  loading: false,
  error: null
};

export const activityReducer = createReducer(
  initialState,
  on(ActivityActions.loadRecentActivity, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ActivityActions.loadRecentActivitySuccess, (state, { activities }) => ({
    ...state,
    recentActivities: activities,
    loading: false
  })),
  on(ActivityActions.loadRecentActivityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ActivityActions.logActivitySuccess, (state, { activity }) => ({
    ...state,
    recentActivities: [activity, ...state.recentActivities]
  }))
);
