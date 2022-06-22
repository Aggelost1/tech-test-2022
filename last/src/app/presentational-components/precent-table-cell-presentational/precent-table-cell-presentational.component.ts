import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-precent-table-cell-presentational',
  templateUrl: './precent-table-cell-presentational.component.html',
  styleUrls: ['./precent-table-cell-presentational.component.scss']
})
export class PrecentTableCellPresentationalComponent {

  @Input() cssClasses: string = '';
  @Input() value: string | number = '';

  constructor() { }

}
