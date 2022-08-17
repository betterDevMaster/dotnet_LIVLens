import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SharedModule } from 'app/shared/shared.module'
import { LandingHomeComponent } from 'app/modules/landing/home/home.component'
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing'
import { PlayerSurveyComponent } from './player-survey/player-survey.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { SurveyFactDisplayComponent } from './survey-fact-display/survey-fact-display.component'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SurveyFactEditComponent } from './survey-fact-edit/survey-fact-edit.component'

@NgModule({
    declarations: [
        LandingHomeComponent,
        PlayerSurveyComponent,
        SurveyFactDisplayComponent,
        SurveyFactEditComponent,
    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSlideToggleModule,
    ],
    providers: [MatNativeDateModule],
})
export class LandingHomeModule {}
