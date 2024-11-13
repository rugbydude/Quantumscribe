import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {
    selectedTaskId: string | null;
    loading: boolean;
    error: string | null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
    selectedTaskId: null,
    loading: false,
    error: null
});

export const taskReducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
        adapter.setAll(tasks, { ...state, loading: false })
    ),
    on(TaskActions.loadTasksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(TaskActions.updateTaskStatus, (state, { taskId, status }) =>
        adapter.updateOne(
            { id: taskId, changes: { status } },
            state
        )
    )
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
