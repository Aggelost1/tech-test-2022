import { groupSelected, loadGroups, loadMeasurments, loadTeamList, measurementSelected, retrievedGroupList, retrievedGroupListFailure, retrievedMeasurementList, retrievedMeasurementListFailure, retrievedTeamList, retrievedTeamListFailure } from "./dashboard.actions";

describe('actions', () => {


    describe('retrievedTeamListFailure', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Teams Failed';

            const action = retrievedTeamListFailure();
            expect(action.type).toEqual(type);
        });
    });

    describe('loadTeamList', () => {
        it('should create an action', () => {
            const type = '[Dashboard] load Teams';
            const action = loadTeamList();
            expect(action.type).toEqual(type);
        });
    });

    describe('retrievedTeamList', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Teams Success';
            const action = retrievedTeamList({ teamsData: [] });
            expect(action.type).toEqual(type);
        });
    });

    describe('loadMeasurments', () => {
        it('should create an action', () => {
            const type = '[Dashboard] load Measurments';
            const action = loadMeasurments({ group: 'w' });
            expect(action.type).toEqual(type);
        });
    });

    describe('retrievedMeasurementList', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Measurments Success';
            const action = retrievedMeasurementList({ measurements: [] });
            expect(action.type).toEqual(type);
        });
    });

    describe('retrievedMeasurementListFailure', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Measurments Failed';
            const action = retrievedMeasurementListFailure();
            expect(action.type).toEqual(type);
        });
    });

    describe('loadGroups', () => {
        it('should create an action', () => {
            const type = '[Dashboard] load Groups';
            const action = loadGroups();
            expect(action.type).toEqual(type);
        });
    });

    describe('retrievedGroupList', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Groups Success';
            const action = retrievedGroupList({ groups: [] });
            expect(action.type).toEqual(type);
        });
    });

    describe('retrievedGroupListFailure', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Retrieve Groups Failed';
            const action = retrievedGroupListFailure();
            expect(action.type).toEqual(type);
        });
    });

    describe('groupSelected', () => {
        it('should create an action', () => {
            const type = '[Dashboard] Group Selected';
            const action = groupSelected({ group: 'wot' });
            expect(action.type).toEqual(type);
        });
    });

    describe('measurementSelected', () => {
        it('should create an action', () => {
            const type = '[Dashboard] measurement Selected';
            const action = measurementSelected({ measurement: 'wot' });
            expect(action.type).toEqual(type);
        });
    });
});

