import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            mergeMap(() => this.taskService.getTasks()
                .pipe(
                    map(tasks => TaskActions.loadTasksSuccess({ tasks })),
                    catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
                ))
        )
    );

    updateTaskStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTaskStatus),
            mergeMap(({ taskId, status }) => this.taskService.updateTaskStatus(taskId, status)
                .pipe(
                    map(task => TaskActions.loadTasksSuccess({ tasks: [task] })),
                    catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
                ))
        )
    );

    constructor(
        private actions$: Actions,
        private taskService: TaskService
    ) {}
}
