import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSurveyComponent } from './player-survey.component';

describe('PlayerSurveyComponent', () => {
  let component: PlayerSurveyComponent;
  let fixture: ComponentFixture<PlayerSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
