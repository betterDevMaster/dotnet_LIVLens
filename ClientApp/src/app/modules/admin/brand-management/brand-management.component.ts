import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BrandFormComponent } from './brand-form/brand-form.component'
import { BrandManagementService } from './brand-management.service'

@Component({
    selector: 'app-brand-management',
    templateUrl: './brand-management.component.html',
    styleUrls: ['./brand-management.component.scss'],
})
export class BrandManagementComponent implements OnInit {
    public displayedColumns = ['brandId', 'name']

    constructor(
        public brndMgmtService: BrandManagementService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {}

    openDialog(): void {
        const dialogRef = this.dialog.open(BrandFormComponent, {
            width: '40%',
        })

        dialogRef.afterClosed().subscribe((result) => {})
    }
}
