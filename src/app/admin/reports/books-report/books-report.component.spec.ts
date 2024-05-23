import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReportComponent } from './books-report.component';

describe('BooksReportComponent', () => {
  let component: BooksReportComponent;
  let fixture: ComponentFixture<BooksReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
