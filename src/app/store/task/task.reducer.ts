import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
}

export const taskAdapter = createEntityAdapter<Task>();

export const initialState: TaskState = taskAdapter.getInitialState({
  selectedTaskId: null,
  loading: false,
  error: null
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loading: false })
  ),
  on(TaskActions.updateTaskStatus, (state, { taskId, status }) =>
    taskAdapter.updateOne(
      { id: taskId, changes: { status } },
      state
    )
  )
); 