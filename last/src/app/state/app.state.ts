import { DashboardFlags, DashboardGroup, Team } from "../dashboard/dashboard.interface";


export interface AppState {
    teamsData: ReadonlyArray<Team>;
    groups: ReadonlyArray<DashboardGroup>;
    measurements: ReadonlyArray<string>;
    selectedMeasurement: string;
    selectedGroup: string;
    flags: DashboardFlags;
}