import { Component, Input, OnInit } from '@angular/core';
import { SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { Team } from '../dashboard.interface';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements OnInit {

  constructor() { }

  @Input() data: Team[] = []

  ngOnInit(): void {
  }

  YTDChart(currentValue: Team) {
    return currentValue.ytd * 100
  }

  MTDChart(currentValue: Team) {
    return { kind: currentValue.name, share: currentValue.mtd / 15 }
  }
  heatChart(accumulator: number[][], currentValue: Team, index: number) {

    accumulator.push([index, 0, currentValue.mtd])
    accumulator.push([index, 1, currentValue.ytd])
    accumulator.push([index, 2, currentValue.today])
    return accumulator;
  }

  dayLabels: string[] = ['mtd', 'ytd', 'today'];

  public yAxisLabelContent = (e: { value: number }): string => {
    return this.dayLabels ? this.dayLabels[e.value] || "" : "";
  };


  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }

  autofit = true;
}
