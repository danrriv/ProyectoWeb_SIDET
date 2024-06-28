import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgenreComponent } from './subgenre.component';

describe('SubgenreComponent', () => {
  let component: SubgenreComponent;
  let fixture: ComponentFixture<SubgenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgenreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubgenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
