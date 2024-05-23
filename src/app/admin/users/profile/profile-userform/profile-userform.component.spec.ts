import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserformComponent } from './profile-userform.component';

describe('ProfileUserformComponent', () => {
  let component: ProfileUserformComponent;
  let fixture: ComponentFixture<ProfileUserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
