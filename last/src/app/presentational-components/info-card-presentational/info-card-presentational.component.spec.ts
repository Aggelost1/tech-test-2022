import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardPresentationalComponent } from './info-card-presentational.component';

describe('InfoCardPresentationalComponent', () => {
  let component: InfoCardPresentationalComponent;
  let fixture: ComponentFixture<InfoCardPresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCardPresentationalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InfoCardPresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have h3 with correct info`, () => {
    component.info = 'my test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('my test');
  });

  it(`should have h3 with correct info`, () => {
    component.info = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')).toBeFalsy();
  });

});
