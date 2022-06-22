import { createReducer, on } from "@ngrx/store";

import { loadGroups, loadMeasurments, loadTeamList, retrievedGroupList, retrievedGroupListFailure, retrievedMeasurementListFailure, retrievedMeasurementList, retrievedTeamList, retrievedTeamListFailure, measurementSelected, groupSelected } from "./dashboard.actions";

import { DashboardFlags, DashboardGroup, Measurements, Team } from "../dashboard/dashboard.interface";

export const initialTeamState: ReadonlyArray<Team> = [];
export const initialGroupState: ReadonlyArray<DashboardGroup> = [];
export const initialMeasurementState: ReadonlyArray<Measurements> = [];
export const initialselectedMeasurement: string = '';
export const initialselectedGroup: string = '';
export const initialflagsState: DashboardFlags = {
    areMeasurementsLoading: false,
    areGroupsLoading: false,
    areTeamsLoading: false,
    hasLoadedTeams: false,
    hasTeamsLoadingError: false,
    hasGroupsLoadingError: false,
    hasMeasurementsLoadingError: false
};

export const teamsDataReducer = createReducer(
    initialTeamState,
    on(retrievedTeamList, (state, { teamsData }) => {

        return teamsData
    }),
    on(retrievedTeamListFailure, () => [])
)

export const measurementReducer = createReducer(
    initialMeasurementState,
    on(retrievedMeasurementList, (state, { measurements }) => {
        return measurements
    }),
    on(retrievedMeasurementListFailure, () => [])
)

export const selectedMeasurementReducer = createReducer(
    initialselectedMeasurement,
    on(measurementSelected, (state, { measurement }) => {
        return measurement
    })
)

export const groupsReducer = createReducer(
    initialGroupState,
    on(retrievedGroupList, (state, { groups }) => groups),
    on(retrievedGroupListFailure, () => [])

)

export const selectedGroupReducer = createReducer(
    initialselectedGroup,
    on(groupSelected, (state, { group }) => {
        return group
    })
)

export const flagsReducer = createReducer(
    initialflagsState,
    on(retrievedTeamList, (state, data) => { return { ...state, hasLoadedTeams: true, areTeamsLoading: false, hasTeamsLoadingError: false } }),
    on(retrievedTeamListFailure, (state, data) => { return { ...state, hasLoadedTeams: false, areTeamsLoading: false, hasTeamsLoadingError: true } }),
    on(loadTeamList, (state, data) => { return { ...state, areTeamsLoading: true } }),

    on(retrievedMeasurementList, (state, data) => { return { ...state, areMeasurementsLoading: false, hasMeasurementsLoadingError: false } }),
    on(retrievedMeasurementListFailure, (state, data) => { return { ...state, areMeasurementsLoading: false, hasMeasurementsLoadingError: true } }),
    on(loadMeasurments, (state, data) => { return { ...state, areMeasurementsLoading: true } }),

    on(retrievedGroupList, (state, data) => { return { ...state, areGroupsLoading: false, hasGroupsLoadingError: false } }),
    on(retrievedGroupListFailure, (state, data) => { return { ...state, areGroupsLoading: false, hasGroupsLoadingError: true } }),
    on(loadGroups, (state, data) => { return { ...state, areGroupsLoading: true } }),
)


