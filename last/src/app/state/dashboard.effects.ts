import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { DashboardService } from '../dashboard/dashboard.service';
import { loadGroups, loadMeasurments, loadTeamList, retrievedGroupList, retrievedGroupListFailure, retrievedMeasurementListFailure, retrievedMeasurementList, retrievedTeamList, retrievedTeamListFailure, measurementSelected, groupSelected, emptyAction } from './dashboard.actions';
import { selectFlags, selectSearchParams, selectSelectedMeasurement } from './dashboard.selectors';

@Injectable()
export class DashBoardEffects {

  constructor(
    private actions$: Actions,
    private strore: Store,
    private dashboardService: DashboardService
  ) { }

  // TODO1: add guards to not call apis if isLoading is true and if params are falsy
  loadteams$ = createEffect(() => this.actions$.pipe(
    ofType(loadTeamList),
    concatLatestFrom((action) => this.strore.select(selectSearchParams)),
    exhaustMap(([action, params]) => {
      if (!params.group || !params.measurement) {
        return EMPTY
      }
      return this.dashboardService.getDashboardData(params.group, params.measurement)
        .pipe(
          map(teamsData => (retrievedTeamList({ teamsData }))),
          catchError((err) => of(retrievedTeamListFailure()))
        )
    })
  )
  );

  // TODO1: add guards to not call apis if isLoading is true and if params are falsy
  loadMeasurments$ = createEffect(() => this.actions$.pipe(
    ofType(loadMeasurments),
    concatLatestFrom((action) => this.strore.select(selectFlags)),
    exhaustMap(([action, flags]) => {
      if (!action.group) {
        return EMPTY
      }
      return this.dashboardService.getMeasurmentData(action.group)
        .pipe(
          mergeMap(measurements => {

            const actionArray: Action[] = [retrievedMeasurementList({ measurements }), measurementSelected({ measurement: measurements[0]?.url || '' })]
            return actionArray;

          }),
          catchError((err) => of(retrievedMeasurementListFailure()))
        )
    }
    ))

  );

  newMeasurement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(measurementSelected),
      concatLatestFrom((action) => this.strore.select(selectFlags)),
      map(([action, flags]) => {
        if (!flags.hasLoadedTeams) {
          return loadTeamList()
        }
        return emptyAction();
      })
    )
  });

  newGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupSelected),
      map((action) => { return loadMeasurments({ group: action.group }) })
    )
  });

  // TODO1: add guards to not call apis if isLoading is true and if params are falsy
  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(loadGroups),
    exhaustMap((action) => {
      return this.dashboardService.getGroupsOptions()
        .pipe(
          mergeMap((groups) => {

            return [retrievedGroupList({ groups }), groupSelected({ group: groups[0]?.url || '' })];

          }),
          catchError((err) => of(retrievedGroupListFailure()))
        )
    })
  )
  );



}