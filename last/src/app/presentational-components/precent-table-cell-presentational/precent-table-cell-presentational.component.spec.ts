import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecentTableCellPresentationalComponent } from './precent-table-cell-presentational.component';

describe('PrecentTableCellPresentationalComponent', () => {
  let component: PrecentTableCellPresentationalComponent;
  let fixture: ComponentFixture<PrecentTableCellPresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrecentTableCellPresentationalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrecentTableCellPresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should present value with %`, () => {
    component.value = .3;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.precent')?.textContent).toContain('30%');
  });

  it(`should have the right number of digits`, () => {
    const values = [1 / 3, 0, 111, 0.363, 0.1234, 0.56784, 0.07, 22]
    const expected = ['33.33%', '0%', '11,100%', '36.3%', '12.34%', '56.78%', '7%', '2,200%']

    values.forEach((value, i) => {
      component.value = value;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.precent')?.textContent).toContain(expected[i]);
    })

  });

  it(`should round up and down approprietly`, () => {
    const values = [0.56780, 0.56781, 0.56784, 0.56785, 0.56789]
    const expected = ['56.78%', '56.78%', '56.78%', '56.79%', '56.79%',]

    values.forEach((value, i) => {
      component.value = value;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.precent')?.textContent).toContain(expected[i]);
    })

  });

});
