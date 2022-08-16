import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ClubDim } from 'app/api/api.generated.clients'
import { ClubManagementService } from './club-management.service'

@Component({
    selector: 'app-club-management',
    templateUrl: './club-management.component.html',
    styleUrls: ['./club-management.component.scss'],
})
export class ClubManagementComponent implements OnInit {
    public displayedColumns = ['manufacturer', 'model']

    @ViewChild('paginator', { static: true }) paginator: MatPaginator

    allBrandsDataSource = new MatTableDataSource<ClubDim>([])

    constructor(
        public clubMgmtService: ClubManagementService,
        public dialog: MatDialog
    ) {
        this.allBrandsDataSource.paginator = this.paginator

        this.clubMgmtService.allClubs.subscribe((clubs) => {
            this.allBrandsDataSource.data = clubs
        })
    }

    ngOnInit(): void {
        this.allBrandsDataSource.paginator = this.paginator
    }

    openDialog(): void {
        // const dialogRef = this.dialog.open(BrandFormComponent, {
        //     width: '40%',
        // })
        // dialogRef.afterClosed().subscribe((result) => {})
    }
}
