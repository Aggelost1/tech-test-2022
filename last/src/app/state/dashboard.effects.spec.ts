


import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing'
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { DashBoardEffects } from './dashboard.effects';
import { DashboardService } from '../dashboard/dashboard.service';
import { emptyAction, groupSelected, loadGroups, loadMeasurments, loadTeamList, measurementSelected, retrievedGroupList, retrievedGroupListFailure, retrievedMeasurementList, retrievedMeasurementListFailure, retrievedTeamList, retrievedTeamListFailure } from './dashboard.actions';
import { Measurements } from '../dashboard/dashboard.interface';
import { select } from '@ngrx/store';


describe('DashBoardEffects', () => {

    let actions: Observable<any>;
    let effects: DashBoardEffects;
    let store: MockStore;
    let dashboardServiceMock: any;
    let testScheduler: TestScheduler;
    const initialState = {
        teams: [],
        groups: [],
        measurements: [],
        flags: {
            areMeasurementsLoading: false,
            areGroupsLoading: false,
            areTeamsLoading: false,
            hasLoadedTeams: false,
            hasTeamsLoadingError: false,
            hasGroupsLoadingError: false,
            hasMeasurementsLoadingError: false
        },
        selectedMeasurement: 'initMeasurment',
        selectedGroup: 'initGroup',

    };

    beforeEach(() => {
        dashboardServiceMock = jasmine.createSpyObj('DashboardService', [
            'getDashboardData',
            'getMeasurmentData',
            'getGroupsOptions',
        ]);

        TestBed.configureTestingModule({
            providers: [
                DashBoardEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: DashboardService, useValue: dashboardServiceMock }
            ],
        });

        effects = TestBed.inject(DashBoardEffects);
        store = TestBed.inject(MockStore);
        store.setState(initialState);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadteams ', () => {
        it('should be load teams and return retrievedTeamList action on success', () => {
            const teamsData = [{
                today: 1,
                mtd: 2,
                ytd: 3,
                todayClass: 'wot',
                mtdClass: 'wot2',
                ytdClass: 'wot3',
                name: 'peter'
            }]
            const action = loadTeamList();
            const outcome = retrievedTeamList({ teamsData });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: teamsData });
                dashboardServiceMock.getDashboardData.and.returnValue(response);

                expectObservable(effects.loadteams$).toBe('--b', { b: outcome })
            })

        });

        it('should be load teams and return retrievedTeamListFail action on fail', () => {
            const error = 'test err';
            const action = loadTeamList();
            const outcome = retrievedTeamListFailure();

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getDashboardData.and.returnValue(response);

                expectObservable(effects.loadteams$).toBe('--b', { b: outcome });
            })

        });

        it('should be load teams and return return empty if no search params are in the state', () => {
            const error = 'test err';
            const action = loadTeamList();
            const myState1 = {
                teams: [],
                groups: [],
                measurements: [],
                flags: {
                    areMeasurementsLoading: false,
                    areGroupsLoading: false,
                    areTeamsLoading: false,
                    hasLoadedTeams: false,
                    hasTeamsLoadingError: false,
                    hasGroupsLoadingError: false,
                    hasMeasurementsLoadingError: false
                },
                selectedMeasurement: '',
                selectedGroup: 'initGroup',

            };
            store.setState(myState1);


            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getDashboardData.and.returnValue(response);

                expectObservable(effects.loadteams$).toBe('');
            })

            const myState2 = {
                teams: [],
                groups: [],
                measurements: [],
                flags: {
                    areMeasurementsLoading: false,
                    areGroupsLoading: false,
                    areTeamsLoading: false,
                    hasLoadedTeams: false,
                    hasTeamsLoadingError: false,
                    hasGroupsLoadingError: false,
                    hasMeasurementsLoadingError: false
                },
                selectedMeasurement: 'test',
                selectedGroup: '',

            };
            store.setState(myState2);


            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getDashboardData.and.returnValue(response);

                expectObservable(effects.loadteams$).toBe('');
            })

            const myState3 = {
                teams: [],
                groups: [],
                measurements: [],
                flags: {
                    areMeasurementsLoading: false,
                    areGroupsLoading: false,
                    areTeamsLoading: false,
                    hasLoadedTeams: false,
                    hasTeamsLoadingError: false,
                    hasGroupsLoadingError: false,
                    hasMeasurementsLoadingError: false
                },
                selectedMeasurement: '',
                selectedGroup: '',

            };
            store.setState(myState3);


            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getDashboardData.and.returnValue(response);

                expectObservable(effects.loadteams$).toBe('');
            })


        });
    })

    describe('loadGroups ', () => {
        it('should be load teams and return retrievedGroupList action on success', () => {
            const groups = [{
                url: 'w',
                label: 'o'
            }]
            const action = loadGroups();
            const outcome = retrievedGroupList({ groups });
            const outcome2 = groupSelected({ group: groups[0]?.url || '' });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: groups });
                dashboardServiceMock.getGroupsOptions.and.returnValue(response);

                expectObservable(effects.loadGroups$).toBe('--(bc)', { b: outcome, c: outcome2 })
            })

        });

        it('should be load teams and return retrievedGroupList Fail action on fail', () => {
            const error = 'test err';
            const action = loadGroups();
            const outcome = retrievedGroupListFailure();

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getGroupsOptions.and.returnValue(response);

                expectObservable(effects.loadGroups$).toBe('--b', { b: outcome });
            })

        });
    })

    describe('loadMeasurments ', () => {


        it('should be on load measuremnts return retrievedTeamList action ', () => {
            const measurements = [{
                url: 'w',
                label: 'o'
            }]
            const action = loadMeasurments({ group: 'o' });
            const outcome1 = retrievedMeasurementList({ measurements });
            const outcome2 = measurementSelected({ measurement: measurements[0]?.url || '' })


            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: measurements });
                dashboardServiceMock.getMeasurmentData.and.returnValue(response);

                expectObservable(effects.loadMeasurments$).toBe('--(bc)', { b: outcome1, c: outcome2 })
            })

        });


        it('should be on load measuremnts and return retrievedMeasurementListFail action on fail', () => {
            const error = 'test err';
            const action = loadMeasurments({ group: 'o' });
            const outcome = retrievedMeasurementListFailure();

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-#', {}, error);
                dashboardServiceMock.getMeasurmentData.and.returnValue(response);

                expectObservable(effects.loadMeasurments$).toBe('--b', { b: outcome });
            })

        });
    })

    describe('newGroup ', () => {
        it('should map to loadMeasurments on groupSelected', () => {
            const action = groupSelected({ group: 'o' });
            const outcome = loadMeasurments({ group: 'o' });

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });

                expectObservable(effects.newGroup$).toBe('-b', { b: outcome });
            })

        });

    })

    describe('newMeasurement ', () => {
        it('should map to loadTeamList on measurementSelected', () => {
            const action = measurementSelected({ measurement: 'o' });
            const outcome = loadTeamList();

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });

                expectObservable(effects.newMeasurement$).toBe('-b', { b: outcome });
            })

        });

        it('should NOT map to loadTeamList on measurementSelected if its has already LoadedTeams', () => {
            const action = measurementSelected({ measurement: 'o' });
            const outcome = emptyAction();

            const myState1 = {
                teams: [],
                groups: [],
                measurements: [],
                flags: {
                    areMeasurementsLoading: false,
                    areGroupsLoading: false,
                    areTeamsLoading: false,
                    hasLoadedTeams: true,
                    hasTeamsLoadingError: false,
                    hasGroupsLoadingError: false,
                    hasMeasurementsLoadingError: false
                },
                selectedMeasurement: '',
                selectedGroup: 'initGroup',

            };
            store.setState(myState1);

            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });

                expectObservable(effects.newMeasurement$).toBe('-b', { b: outcome });
            })

        });

    })
})

