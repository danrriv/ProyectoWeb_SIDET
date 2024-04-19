import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenressubgenreComponent } from './genressubgenre.component';

describe('GenressubgenreComponent', () => {
  let component: GenressubgenreComponent;
  let fixture: ComponentFixture<GenressubgenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenressubgenreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenressubgenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
