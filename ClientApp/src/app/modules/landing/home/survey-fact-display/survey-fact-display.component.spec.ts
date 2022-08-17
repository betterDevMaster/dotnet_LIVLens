import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFactDisplayComponent } from './survey-fact-display.component';

describe('SurveyFactDisplayComponent', () => {
  let component: SurveyFactDisplayComponent;
  let fixture: ComponentFixture<SurveyFactDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFactDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFactDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
