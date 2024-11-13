import { createAction, props } from '@ngrx/store';
import { Task, TaskStatus } from '../../models/task.model';

export const loadTasks = createAction(
    '[Task] Load Tasks'
);

export const loadTasksSuccess = createAction(
    '[Task] Load Tasks Success',
    props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
    '[Task] Load Tasks Failure',
    props<{ error: string }>()
);

export const updateTaskStatus = createAction(
    '[Task] Update Task Status',
    props<{ taskId: string; status: TaskStatus }>()
);
