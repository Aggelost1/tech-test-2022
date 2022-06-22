import { createAction } from '@ngrx/store';
import * as fromActions from './dashboard.actions'
import * as fromReducer from './dashboard.reducer'

describe('Reducers', () => {
    const randomAction = createAction('[random] action');

    describe('teamsDataReducer', () => {
        const initialState = [{
            today: 1,
            mtd: 2,
            ytd: 3,
            todayClass: 'wot',
            mtdClass: 'wot2',
            ytdClass: 'wot3',
            name: 'peter'
        }];

        const initialStateCopy = [{
            today: 1,
            mtd: 2,
            ytd: 3,
            todayClass: 'wot',
            mtdClass: 'wot2',
            ytdClass: 'wot3',
            name: 'peter'
        }];

        it('should not change state on random action', () => {
            const state = fromReducer.teamsDataReducer(initialState, randomAction());
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })

        it('should empty state on retrieve failure', () => {
            const state = fromReducer.teamsDataReducer(initialState, fromActions.retrievedTeamListFailure());
            expect(state).not.toBe(initialState);
            expect(state).toEqual([]);
        })

        it('should populate state on retrieve success', () => {
            const newState = [
                {
                    today: 1,
                    mtd: 2,
                    ytd: 3,
                    todayClass: 'wot',
                    mtdClass: 'wot2',
                    ytdClass: 'wot3',
                    name: 'peter'
                },
                {
                    today: 4,
                    mtd: 5,
                    ytd: 6,
                    todayClass: 'wot4',
                    mtdClass: 'wot5',
                    ytdClass: 'wot6',
                    name: 'peter'
                }
            ];

            const newStateCopy = [
                {
                    today: 1,
                    mtd: 2,
                    ytd: 3,
                    todayClass: 'wot',
                    mtdClass: 'wot2',
                    ytdClass: 'wot3',
                    name: 'peter'
                },
                {
                    today: 4,
                    mtd: 5,
                    ytd: 6,
                    todayClass: 'wot4',
                    mtdClass: 'wot5',
                    ytdClass: 'wot6',
                    name: 'peter'
                }
            ];
            const state = fromReducer.teamsDataReducer(initialState, fromActions.retrievedTeamList({ teamsData: newState }));
            expect(state).not.toBe(initialState);
            expect(state).toEqual(newStateCopy);
        })
    })

    describe('measurementReducer', () => {
        const initialState = [{
            label: 'test1',
            url: 'test2',
        }];

        const initialStateCopy = [{
            label: 'test1',
            url: 'test2',
        }];



        it('should not change state on random action', () => {
            const state = fromReducer.measurementReducer(initialState, randomAction);
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })

        it('should empty state on retrieve failure', () => {
            const state = fromReducer.measurementReducer(initialState, fromActions.retrievedMeasurementListFailure());
            expect(state).not.toBe(initialState);
            expect(state).toEqual([]);
        })

        it('should populate state on retrieve success', () => {
            const newState = [{
                label: 'wot',
                url: 'wot2',
            }];

            const newStateCopy = [{
                label: 'wot',
                url: 'wot2',
            }];
            const state = fromReducer.measurementReducer(initialState, fromActions.retrievedMeasurementList({ measurements: newState }));
            expect(state).not.toBe(initialState);
            expect(state).toEqual(newStateCopy);
        })
    })

    describe('selectedMeasurementReducer', () => {
        const initialState = 'test1'

        const initialStateCopy = 'test1'



        it('should not change state on random action', () => {
            const state = fromReducer.selectedMeasurementReducer(initialState, randomAction);
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })


        it('should populate state on selected', () => {

            const state = fromReducer.selectedMeasurementReducer(initialState, fromActions.measurementSelected({ measurement: 'wot2' }));
            expect(state).not.toBe(initialState);
            expect(state).toEqual('wot2');
        })
    })

    describe('groupsReducer', () => {
        const initialState = [{
            label: 'test11',
            url: 'test21',
        }];

        const initialStateCopy = [{
            label: 'test11',
            url: 'test21',
        }];



        it('should not change state on random action', () => {
            const state = fromReducer.groupsReducer(initialState, randomAction);
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })

        it('should empty state on retrieve failure', () => {
            const state = fromReducer.groupsReducer(initialState, fromActions.retrievedGroupListFailure());
            expect(state).not.toBe(initialState);
            expect(state).toEqual([]);
        })

        it('should populate state on retrieve success', () => {
            const newState = [{
                label: 'wot11',
                url: 'wot21',
            }];

            const newStateCopy = [{
                label: 'wot11',
                url: 'wot21',
            }];
            const state = fromReducer.groupsReducer(initialState, fromActions.retrievedGroupList({ groups: newState }));
            expect(state).not.toBe(initialState);
            expect(state).toEqual(newStateCopy);
        })
    })

    describe('selectedGroupReducer', () => {
        const initialState = 'test1'

        const initialStateCopy = 'test1'



        it('should not change state on random action', () => {
            const state = fromReducer.selectedGroupReducer(initialState, randomAction);
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })


        it('should populate state on selected', () => {

            const state = fromReducer.selectedGroupReducer(initialState, fromActions.groupSelected({ group: 'wot2' }));
            expect(state).not.toBe(initialState);
            expect(state).toEqual('wot2');
        })
    })

    describe('flagsReducer', () => {
        const initialState = {
            areMeasurementsLoading: false,
            areGroupsLoading: false,
            areTeamsLoading: false,
            hasLoadedTeams: false,
            hasTeamsLoadingError: false,
            hasGroupsLoadingError: false,
            hasMeasurementsLoadingError: false
        }

        const initialStateCopy = {
            areMeasurementsLoading: false,
            areGroupsLoading: false,
            areTeamsLoading: false,
            hasLoadedTeams: false,
            hasTeamsLoadingError: false,
            hasGroupsLoadingError: false,
            hasMeasurementsLoadingError: false
        }



        it('should not change state on random action', () => {
            const state = fromReducer.flagsReducer(initialState, randomAction);
            expect(state).toBe(initialState);
            expect(state).toEqual(initialStateCopy);
        })

        it('should change flags on retrieve failure', () => {

            const startingState = {
                areMeasurementsLoading: true,
                areGroupsLoading: true,
                areTeamsLoading: true,
                hasLoadedTeams: true,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }

            // TODO1: refactore to expected states beeing in an array and we ngfor (or something else less bulky and more readable) 
            const expectedState1 = {
                areMeasurementsLoading: true,
                areGroupsLoading: false,
                areTeamsLoading: true,
                hasLoadedTeams: true,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: true,
                hasMeasurementsLoadingError: false
            }

            const expectedState2 = {
                areMeasurementsLoading: true,
                areGroupsLoading: true,
                areTeamsLoading: false,
                hasLoadedTeams: false,
                hasTeamsLoadingError: true,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }

            const expectedState3 = {
                areMeasurementsLoading: false,
                areGroupsLoading: true,
                areTeamsLoading: true,
                hasLoadedTeams: true,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: true
            }

            const state1 = fromReducer.flagsReducer(startingState, fromActions.retrievedGroupListFailure());
            expect(state1).not.toBe(startingState);
            expect(state1).toEqual(expectedState1);

            const state2 = fromReducer.flagsReducer(startingState, fromActions.retrievedTeamListFailure());
            expect(state2).not.toBe(startingState);
            expect(state2).toEqual(expectedState2);

            const state3 = fromReducer.flagsReducer(startingState, fromActions.retrievedMeasurementListFailure());
            expect(state3).not.toBe(startingState);
            expect(state3).toEqual(expectedState3);
        })

        it('should change flags on retrieve success', () => {
            const startingState = {
                areMeasurementsLoading: true,
                areGroupsLoading: true,
                areTeamsLoading: true,
                hasLoadedTeams: false,
                hasTeamsLoadingError: true,
                hasGroupsLoadingError: true,
                hasMeasurementsLoadingError: true
            }

            // TODO1: refactore to expected states beeing in an array and we ngfor (or something else less bulky and more readable) 
            const expectedState1 = {
                areMeasurementsLoading: true,
                areGroupsLoading: false,
                areTeamsLoading: true,
                hasLoadedTeams: false,
                hasTeamsLoadingError: true,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: true
            }

            const expectedState2 = {
                areMeasurementsLoading: true,
                areGroupsLoading: true,
                areTeamsLoading: false,
                hasLoadedTeams: true,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: true,
                hasMeasurementsLoadingError: true
            }

            const expectedState3 = {
                areMeasurementsLoading: false,
                areGroupsLoading: true,
                areTeamsLoading: true,
                hasLoadedTeams: false,
                hasTeamsLoadingError: true,
                hasGroupsLoadingError: true,
                hasMeasurementsLoadingError: false
            }

            const retrievedState = [{
                label: 'wot11',
                url: 'wot21',
            }];

            const newState = [
                {
                    today: 1,
                    mtd: 2,
                    ytd: 3,
                    todayClass: 'wot',
                    mtdClass: 'wot2',
                    ytdClass: 'wot3',
                    name: 'peter'
                }
            ];
            const state1 = fromReducer.flagsReducer(startingState, fromActions.retrievedGroupList({ groups: retrievedState }));
            expect(state1).not.toBe(startingState);
            expect(state1).toEqual(expectedState1);

            const state2 = fromReducer.flagsReducer(startingState, fromActions.retrievedTeamList({ teamsData: newState }));
            expect(state2).not.toBe(startingState);
            expect(state2).toEqual(expectedState2);

            const state3 = fromReducer.flagsReducer(startingState, fromActions.retrievedMeasurementList({ measurements: retrievedState }));
            expect(state3).not.toBe(startingState);
            expect(state3).toEqual(expectedState3);
        })

        it('should change flags on retrieve load', () => {

            const startingState = {
                areMeasurementsLoading: false,
                areGroupsLoading: false,
                areTeamsLoading: false,
                hasLoadedTeams: false,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }

            // TODO1: refactore to expected states beeing in an array and we ngfor (or something else less bulky and more readable) 
            const expectedState1 = {
                areMeasurementsLoading: false,
                areGroupsLoading: true,
                areTeamsLoading: false,
                hasLoadedTeams: false,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }


            const expectedState2 = {
                areMeasurementsLoading: false,
                areGroupsLoading: false,
                areTeamsLoading: true,
                hasLoadedTeams: false,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }

            const expectedState3 = {
                areMeasurementsLoading: true,
                areGroupsLoading: false,
                areTeamsLoading: false,
                hasLoadedTeams: false,
                hasTeamsLoadingError: false,
                hasGroupsLoadingError: false,
                hasMeasurementsLoadingError: false
            }


            const state1 = fromReducer.flagsReducer(startingState, fromActions.loadGroups());
            expect(state1).not.toBe(startingState);
            expect(state1).toEqual(expectedState1);

            const state2 = fromReducer.flagsReducer(startingState, fromActions.loadTeamList());
            expect(state2).not.toBe(startingState);
            expect(state2).toEqual(expectedState2);

            const state3 = fromReducer.flagsReducer(startingState, fromActions.loadMeasurments({ group: 't' }));
            expect(state3).not.toBe(startingState);
            expect(state3).toEqual(expectedState3);
        })

    })

})