import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, Subscription } from 'rxjs';
import { groupSelected, loadGroups, loadMeasurments, loadTeamList, measurementSelected } from '../state/dashboard.actions';
import { selectGroups, selectMeasurements } from '../state/dashboard.selectors';

import { DashboardComponent } from './dashboard.component';
import { DashboardGroup, Team } from './dashboard.interface';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
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
    }
  };

  let storeSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    storeSpy = spyOn(store, 'dispatch').and.callFake(() => { });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('ngOnInit', () => {
    it('should exist', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should call initiateData oninit', () => {
      const spy = spyOn(component, 'initiateData').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should call subscribeToChanges oninit', () => {
      const spy = spyOn(component, 'subscribeToChanges').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  })

  describe('ngOnDestroy', () => {
    it('should exist', () => {
      expect(component.ngOnDestroy).toBeTruthy();
    });

    it('should call killSubscriptions', () => {
      const spy = spyOn(component, 'killSubscriptions').and.callThrough();
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });

  })

  describe('killSubscriptions', () => {
    it('should exist', () => {
      expect(component.killSubscriptions).toBeTruthy();
    });

    it('should kill Subscriptions', () => {
      component.groupSubscription = new Subscription();
      component.measurementSubscription = new Subscription();

      const groupSpy = spyOn(component.groupSubscription, 'unsubscribe').and.callThrough();
      const measurementSpy = spyOn(component.measurementSubscription, 'unsubscribe').and.callThrough();

      component.killSubscriptions();
      expect(groupSpy).toHaveBeenCalled();
      expect(measurementSpy).toHaveBeenCalled();
    });

    it('should not call unSubscribe if subscriptions are undefined', () => {
      component.groupSubscription = new Subscription();
      component.measurementSubscription = new Subscription();

      const groupSpy = spyOn(component.groupSubscription, 'unsubscribe').and.callThrough();
      const measurementSpy = spyOn(component.measurementSubscription, 'unsubscribe').and.callThrough();

      component.groupSubscription = undefined;
      component.measurementSubscription = undefined;

      component.killSubscriptions();
      expect(groupSpy).not.toHaveBeenCalled();
      expect(measurementSpy).not.toHaveBeenCalled();
    });

  })

  describe('initiateData', () => {
    it('should exist', () => {
      expect(component.initiateData).toBeTruthy();
    });

    it('should call getGroupsOptions', () => {
      const spy = spyOn(component, 'getGroupsOptions').and.callThrough();
      component.initiateData();
      expect(spy).toHaveBeenCalled();
    });

  })

  describe('subscribeToChanges', () => {
    it('should exist', () => {
      expect(component.subscribeToChanges).toBeTruthy();
    });

    it('should subsribe toGroups and measurements ', () => {
      const groupSpy = spyOn(component.selectedGroup$, 'subscribe').and.callThrough();
      const measurementSpy = spyOn(component.selectedMeasurement$, 'subscribe').and.callThrough();


      component.subscribeToChanges();
      expect(groupSpy).toHaveBeenCalled();
      expect(measurementSpy).toHaveBeenCalled();
    });

  })

  describe('getGroupsOptions', () => {
    it('should exist', () => {
      expect(component.getGroupsOptions).toBeTruthy();
    });

    it('should call store.dispatch', () => {
      component.selectedGroup = 'wot11'
      const excpectedArg = loadGroups();
      storeSpy.calls.reset();
      component.getGroupsOptions();
      expect(storeSpy).toHaveBeenCalledWith(excpectedArg);
    });

  })

  describe('groupChanged', () => {
    it('should exist', () => {
      expect(component.groupChanged).toBeTruthy();
    });

    it('should call store.dispatch with correct args', () => {

      const excpectedArg = groupSelected({ group: 'test12' });
      storeSpy.calls.reset();
      component.groupChanged('test12');
      expect(storeSpy).toHaveBeenCalledWith(excpectedArg);
    });


  })

  describe('measurementChanged', () => {
    it('should exist', () => {
      expect(component.measurementChanged).toBeTruthy();
    });

    it('should call store.dispatch with correct args', () => {

      const excpectedArg = measurementSelected({ measurement: 'test12' });
      storeSpy.calls.reset();
      component.measurementChanged('test12');
      expect(storeSpy).toHaveBeenCalledWith(excpectedArg);
    });


  })

  describe('onSearch', () => {
    it('should exist', () => {
      expect(component.onSearch).toBeTruthy();
    });

    it('should call store.dispatch with correct args', () => {
      component.selectedGroup = 'wot21';
      component.selectedMeasurement = 'wot22';
      const excpectedArg = loadTeamList();
      storeSpy.calls.reset();
      component.onSearch();
      expect(storeSpy).toHaveBeenCalledWith(excpectedArg);
    });

    it('should not call store.dispatch if no grou or measurement is selected', () => {

      component.selectedGroup = '';
      component.selectedMeasurement = 'wot22';
      storeSpy.calls.reset();
      component.onSearch();
      expect(storeSpy).not.toHaveBeenCalled();

      component.selectedGroup = 'wot';
      component.selectedMeasurement = '';
      storeSpy.calls.reset();
      component.onSearch();
      expect(storeSpy).not.toHaveBeenCalled();

      component.selectedGroup = '';
      component.selectedMeasurement = '';
      storeSpy.calls.reset();
      component.onSearch();
      expect(storeSpy).not.toHaveBeenCalled();
    });

  })




});
