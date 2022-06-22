import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';

import { groupSelected, loadGroups, loadMeasurments, loadTeamList, measurementSelected } from '../state/dashboard.actions';

import { DashboardFlags, DashboardGroup, Measurements, Team } from './dashboard.interface';
import { Store } from '@ngrx/store';
import { selectFlags, selectGroups, selectMeasurements, selectSelectedGroup, selectSelectedMeasurement, selectTeamsData } from '../state/dashboard.selectors';
import { Observable, Subscription } from 'rxjs';
import { RenderEvent, SeriesLabelsContentArgs, SeriesVisualArgs } from '@progress/kendo-angular-charts';
import { geometry, Element, Layout, Text } from '@progress/kendo-drawing';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit, OnDestroy {

  groupSubscription: Subscription | undefined;
  measurementSubscription: Subscription | undefined;

  teamsData$: Observable<Team[]> = this.store.select(selectTeamsData);
  groups$: Observable<readonly DashboardGroup[]> = this.store.select(selectGroups);
  selectedGroup$: Observable<string> = this.store.select(selectSelectedGroup);
  measurements$: Observable<readonly Measurements[]> = this.store.select(selectMeasurements);
  selectedMeasurement$: Observable<string> = this.store.select(selectSelectedMeasurement);
  flags$: Observable<DashboardFlags> = this.store.select(selectFlags);


  constructor(private store: Store) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective | undefined;

  public selectedGroup: string = '';
  public selectedMeasurement: string = '';
  public errorMesage = 'There was an error getting your data please try again later';

  public ngOnInit(): void {
    this.initiateData();
    this.subscribeToChanges();
  }

  public ngOnDestroy(): void {
    this.killSubscriptions();
  }

  killSubscriptions() {
    this.groupSubscription?.unsubscribe();
    this.measurementSubscription?.unsubscribe();
  }


  initiateData() {
    this.getGroupsOptions();
  }

  // TODO1 : set up selected group and selected measurment in a reactive form and hook that up to the store (easier to extend/modify)
  subscribeToChanges() {

    this.groupSubscription = this.selectedGroup$.subscribe((group) => {
      this.selectedGroup = group;
    });

    this.measurementSubscription = this.selectedMeasurement$.subscribe((measurement: string) => {
      this.selectedMeasurement = measurement;
    })
  }

  getGroupsOptions() {
    this.store.dispatch(loadGroups());
  }

  groupChanged(event: string) {
    this.store.dispatch(groupSelected({ group: event }));
  }

  measurementChanged(event: string) {
    this.store.dispatch(measurementSelected({ measurement: event }));
  }

  onSearch() {
    if (!this.selectedGroup || !this.selectedMeasurement) {
      return
    }

    this.store.dispatch(loadTeamList());
  }

}
