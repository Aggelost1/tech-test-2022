export interface Film {
    characters: string[];
    planets: string[];
    title: string;
    url: string;

}

export interface Planet {
    residents: string[];
    name: string;
    url: string;
}

export interface Resident {
    height: number;
    mass: number | 'unknown';
    films: string[];
    url: string;
    name: string;
}

export interface Team {
    today: number;
    mtd: number;
    ytd: number;
    todayClass: string;
    mtdClass: string;
    ytdClass: string;
    name: string;

}


// TODO: merge dashboardgroup and measurment group inteface into dropdownOption Interface
export interface DashboardGroup {
    label: string;
    url: string;
}

export interface Measurements {
    label: string;
    url: string;
}

export interface DashboardFlags {
    areMeasurementsLoading: boolean;
    areGroupsLoading: boolean;
    areTeamsLoading: boolean;
    hasLoadedTeams: boolean;
    hasTeamsLoadingError: boolean;
    hasGroupsLoadingError: boolean;
    hasMeasurementsLoadingError: boolean;
}


