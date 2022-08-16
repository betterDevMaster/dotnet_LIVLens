import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BrandFormComponent } from './brand-form/brand-form.component'
import { BrandManagementService } from './brand-management.service'
import { MatPaginator } from '@angular/material/paginator'
import { cloneDeep } from 'lodash'
import { MatTableDataSource } from '@angular/material/table'
import BRAND_DIM from 'app/models/brand'
import { BrandDim } from 'app/api/api.generated.clients'

@Component({
    selector: 'app-brand-management',
    templateUrl: './brand-management.component.html',
    styleUrls: ['./brand-management.component.scss'],
})
export class BrandManagementComponent implements OnInit {
    public displayedColumns = ['brandId', 'brand']

    @ViewChild('paginator', { static: true }) paginator: MatPaginator

    allBrandsDataSource = new MatTableDataSource<BrandDim>([])

    constructor(
        public brndMgmtService: BrandManagementService,
        public dialog: MatDialog
    ) {
        this.allBrandsDataSource.paginator = this.paginator
        this.brndMgmtService.allBrands.subscribe((brands) => {
            this.allBrandsDataSource.data = brands
            this.allBrandsDataSource.paginator = this.paginator
        })
    }

    ngOnInit(): void {
        this.allBrandsDataSource.paginator = this.paginator
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(BrandFormComponent, {
            width: '40%',
        })

        dialogRef.afterClosed().subscribe((result) => {})
    }
}
