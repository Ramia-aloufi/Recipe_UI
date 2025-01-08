import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecipeCardComponent } from './profile-recipe-card.component';

describe('ProfileRecipeCardComponent', () => {
  let component: ProfileRecipeCardComponent;
  let fixture: ComponentFixture<ProfileRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
