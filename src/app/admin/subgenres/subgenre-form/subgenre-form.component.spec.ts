import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgenreFormComponent } from './subgenre-form.component';

describe('SubgenreFormComponent', () => {
  let component: SubgenreFormComponent;
  let fixture: ComponentFixture<SubgenreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgenreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubgenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
