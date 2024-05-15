import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersPurchasesComponent } from './customers-purchases.component';

describe('CustomersPurchasesComponent', () => {
  let component: CustomersPurchasesComponent;
  let fixture: ComponentFixture<CustomersPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersPurchasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
