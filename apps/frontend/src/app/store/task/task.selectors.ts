import { createSelector } from '@ngrx/store';
import { Task, TaskStatus } from '../../models/task.model';
import { AppState } from '../app.state';
import { TaskState } from './task.reducer';

export const selectTaskState = (state: AppState) => state.tasks;

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => Object.values(state.entities).filter((task): task is Task => task !== null)
);

export const selectTasksByStatus = createSelector(
  selectAllTasks,
  (tasks: Task[]) => ({
    [TaskStatus.TODO]: tasks.filter(task => task.status === TaskStatus.TODO),
    [TaskStatus.IN_PROGRESS]: tasks.filter(task => task.status === TaskStatus.IN_PROGRESS),
    [TaskStatus.DONE]: tasks.filter(task => task.status === TaskStatus.DONE)
  })
);

export const selectPendingTasks = createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.filter(task => 
    task.status === TaskStatus.TODO || task.status === TaskStatus.IN_PROGRESS
  )
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.filter(task => task.status === TaskStatus.DONE)
);
