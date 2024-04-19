import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresubgenreFormComponent } from './genresubgenre-form.component';

describe('GenresubgenreFormComponent', () => {
  let component: GenresubgenreFormComponent;
  let fixture: ComponentFixture<GenresubgenreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresubgenreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresubgenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
