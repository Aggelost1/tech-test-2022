import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-card-presentational',
  templateUrl: './info-card-presentational.component.html',
  styleUrls: ['./info-card-presentational.component.scss']
})
export class InfoCardPresentationalComponent {
  @Input() cssClasses: string = '';
  @Input() info: string = '';

  constructor() { }

}
