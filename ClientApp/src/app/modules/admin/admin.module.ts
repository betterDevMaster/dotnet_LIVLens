import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTableModule } from '@angular/material/table'
import { QuillModule } from 'ngx-quill'
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key'
import { FuseNavigationModule } from '@fuse/components/navigation'
import { FuseScrollbarModule } from '@fuse/directives/scrollbar'
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset'
import { SharedModule } from 'app/shared/shared.module'
import { AdminComponent } from './admin.component'
import { EventManagementComponent } from './event-management/event-management.component'
import { ClubManagementComponent } from './club-management/club-management.component'
import { PlayerManagementComponent } from './player-management/player-management.component'
import { BrandManagementComponent } from './brand-management/brand-management.component'
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component'
import { adminRoutes } from './admin.routing'
import { BrandFormComponent } from './brand-management/brand-form/brand-form.component'
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
    declarations: [
        AdminComponent,
        EventManagementComponent,
        ClubManagementComponent,
        PlayerManagementComponent,
        BrandManagementComponent,
        AdminSidebarComponent,
        BrandFormComponent,
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        QuillModule.forRoot(),
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
    ],
})
export class AdminModule {}
