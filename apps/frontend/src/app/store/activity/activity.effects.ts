import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActivityService } from '../../services/activity.service';
import * as ActivityActions from './activity.actions';

@Injectable()
export class ActivityEffects {
  loadRecentActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadRecentActivity),
      mergeMap(({ limit }) =>
        this.activityService.getRecentActivity(limit).pipe(
          map(activities => ActivityActions.loadRecentActivitySuccess({ activities })),
          catchError(error => of(ActivityActions.loadRecentActivityFailure({ error })))
        )
      )
    )
  );

  logActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.logActivity),
      mergeMap(({ activity }) =>
        this.activityService.logActivity(activity).pipe(
          map(loggedActivity => ActivityActions.logActivitySuccess({ activity: loggedActivity })),
          catchError(error => of(ActivityActions.logActivityFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}
}
