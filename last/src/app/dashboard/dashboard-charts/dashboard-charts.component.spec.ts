import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartsComponent } from './dashboard-charts.component';

describe('DashboardChartsComponent', () => {
  let component: DashboardChartsComponent;
  let fixture: ComponentFixture<DashboardChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardChartsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('YTDChart', () => {
    it('should exist', () => {
      expect(component.YTDChart).toBeTruthy();
    });

    it('should return correct number', () => {
      const team = {
        today: 1,
        mtd: 2,
        ytd: 3,
        todayClass: 'wot',
        mtdClass: 'wot2',
        ytdClass: 'wot3',
        name: 'peter'
      }
      expect(component.YTDChart(team)).toBe(300);
    });


  })

  describe('MTDChart', () => {
    it('should exist', () => {
      expect(component.MTDChart).toBeTruthy();
    });

    it('should return correct object', () => {
      const team = {
        today: 1,
        mtd: 2,
        ytd: 3,
        todayClass: 'wot',
        mtdClass: 'wot2',
        ytdClass: 'wot3',
        name: 'peter'
      }
      expect(component.MTDChart(team)).toEqual({ kind: 'peter', share: 2 / 15 });
    });

  })

  describe('heatChart', () => {
    it('should exist', () => {
      expect(component.heatChart).toBeTruthy();
    });

    it('should return correct object', () => {
      const teams = [
        {
          mtd: 1,
          ytd: 2,
          today: 3,
          todayClass: 'wot',
          mtdClass: 'wot2',
          ytdClass: 'wot3',
          name: 'peter'
        },
        {
          mtd: 4,
          ytd: 5,
          today: 6,
          todayClass: 'wot4',
          mtdClass: 'wot5',
          ytdClass: 'wot6',
          name: 'notpeter'
        }
      ]
      expect(teams.reduce(component.heatChart, [])).toEqual([[0, 0, 1], [0, 1, 2], [0, 2, 3], [1, 0, 4], [1, 1, 5], [1, 2, 6]]);
    });


  })

  describe('yAxisLabelContent', () => {
    it('should exist', () => {
      expect(component.yAxisLabelContent).toBeTruthy();
    });

    it('should return correct object', () => {
      component.dayLabels = ['test1', 'test2', 'test3'];
      expect(component.yAxisLabelContent({ value: 0 })).toEqual('test1');
      expect(component.yAxisLabelContent({ value: 1 })).toEqual('test2');
      expect(component.yAxisLabelContent({ value: 2 })).toEqual('test3');
    });

    it('should return correct object [Integration Test]', () => {

      expect(component.yAxisLabelContent({ value: 0 })).toEqual('mtd');
      expect(component.yAxisLabelContent({ value: 1 })).toEqual('ytd');
      expect(component.yAxisLabelContent({ value: 2 })).toEqual('today');
    });



  })

  describe('labelContent', () => {
    it('should exist', () => {
      expect(component.labelContent).toBeTruthy();
    });

    it('should return correct object', () => {
      expect(component.labelContent({
        category: 'wot',
        text: '',
        dataItem: undefined,
        value: undefined,
        series: undefined
      })).toEqual('wot');

    });

  })
});
