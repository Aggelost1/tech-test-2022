import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { AppComponent } from './app.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoCardPresentationalComponent } from './presentational-components/info-card-presentational/info-card-presentational.component';
import { PrecentTableCellPresentationalComponent } from './presentational-components/precent-table-cell-presentational/precent-table-cell-presentational.component';
import { flagsReducer, groupsReducer, measurementReducer, selectedGroupReducer, selectedMeasurementReducer, teamsDataReducer } from './state/dashboard.reducer';
import { DashBoardEffects } from './state/dashboard.effects';
import { EffectsModule } from '@ngrx/effects';
import { DashboardChartsComponent } from './dashboard/dashboard-charts/dashboard-charts.component';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InfoCardPresentationalComponent,
    PrecentTableCellPresentationalComponent,
    DashboardChartsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ 
      teams: teamsDataReducer, 
      groups: groupsReducer,
      measurements: measurementReducer, 
      flags: flagsReducer,
      selectedGroup: selectedGroupReducer,
      selectedMeasurement: selectedMeasurementReducer,
    }),
    EffectsModule.forRoot([DashBoardEffects]),
    InputsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    ChartsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    DropDownsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
