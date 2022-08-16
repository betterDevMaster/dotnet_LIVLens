import {
    ActivatedRouteSnapshot,
    Route,
    UrlMatchResult,
    UrlSegment,
} from '@angular/router'
import { isEqual } from 'lodash-es'
import { AdminComponent } from './admin.component'
import { BrandManagementComponent } from './brand-management/brand-management.component'
import { ClubManagementComponent } from './club-management/club-management.component'
import { EventManagementComponent } from './event-management/event-management.component'
import { PlayerManagementComponent } from './player-management/player-management.component'

export const adminRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'brands',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'brands',
                component: BrandManagementComponent,
            },
            {
                path: 'clubs',
                component: ClubManagementComponent,
            },
            {
                path: 'events',
                component: EventManagementComponent,
            },
            {
                path: 'players',
                component: PlayerManagementComponent,
            },
        ],
    },
]
