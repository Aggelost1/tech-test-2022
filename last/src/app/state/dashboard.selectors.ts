import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { DashboardFlags, DashboardGroup, Measurements, Team } from "../dashboard/dashboard.interface";
import { measurementReducer } from "./dashboard.reducer";

// TODO1: pretend our app is larger and make the selectors approprietly 
// in a larger app this whole thing would probably be one feature so we sould have createFeatureSelector<finacialData> 
// where the type finacialData has teams, groups, measurements and flags and thoose are just selectors now
export const selectTeamsData =
    createFeatureSelector<Team[]>('teams');

// TODO2: make the arrays into entities 
export const selectGroups =
    createFeatureSelector<ReadonlyArray<DashboardGroup>>('groups');

// TODO3: put the selected in one object with its corresponding array
export const selectSelectedGroup =
    createFeatureSelector<string>('selectedGroup');

export const selectMeasurements =
    createFeatureSelector<ReadonlyArray<Measurements>>('measurements');

// TODO3: put the selected in one object with its corresponding array
export const selectSelectedMeasurement =
    createFeatureSelector<string>('selectedMeasurement');

export const selectSearchParams =
    createSelector(
        selectSelectedGroup,
        selectSelectedMeasurement,
        (group, measurement) => {
            return { group, measurement };
        }
    )

// TODO4: put the flags in one object with its corresponding array
export const selectFlags =
    createFeatureSelector<DashboardFlags>('flags');




