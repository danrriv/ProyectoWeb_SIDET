import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailsReportComponent } from './sale-details-report.component';

describe('SaleDetailsReportComponent', () => {
  let component: SaleDetailsReportComponent;
  let fixture: ComponentFixture<SaleDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDetailsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
