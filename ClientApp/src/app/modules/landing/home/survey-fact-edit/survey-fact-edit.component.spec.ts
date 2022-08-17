import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFactEditComponent } from './survey-fact-edit.component';

describe('SurveyFactEditComponent', () => {
  let component: SurveyFactEditComponent;
  let fixture: ComponentFixture<SurveyFactEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFactEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
