import { createReducer, on, createAction, props } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

// Define Task interface since task.model.ts is missing
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  assigneeId?: string;
  dueDate?: Date;
}

// Define TaskActions
export const TaskActions = {
  loadTasks: createAction('[Task] Load Tasks'),
  loadTasksSuccess: createAction(
    '[Task] Load Tasks Success',
    props<{ tasks: Task[] }>()
  ),
  updateTaskStatus: createAction(
    '[Task] Update Task Status',
    props<{ taskId: string, status: string }>()
  )
};

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
