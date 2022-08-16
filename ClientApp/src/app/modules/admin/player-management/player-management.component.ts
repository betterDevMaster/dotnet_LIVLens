import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { PlayerDim } from 'app/api/api.generated.clients'
import { PlayerManagementService } from './player-management.service'

@Component({
    selector: 'app-player-management',
    templateUrl: './player-management.component.html',
    styleUrls: ['./player-management.component.scss'],
})
export class PlayerManagementComponent implements OnInit {
    public displayedColumns = [
        'playerId',
        'firstName',
        'lastName',
        'dob',
        'countryName',
        'countryCode',
        'amateur',
    ]

    @ViewChild('paginator', { static: true }) paginator: MatPaginator

    allPlayersDataSource = new MatTableDataSource<PlayerDim>([])

    constructor(
        public playerMgmtService: PlayerManagementService,
        public dialog: MatDialog
    ) {
        this.allPlayersDataSource.paginator = this.paginator

        this.playerMgmtService.allPlayers.subscribe((players) => {
            this.allPlayersDataSource.data = players
            this.allPlayersDataSource.paginator = this.paginator
        })
    }

    ngOnInit(): void {
        this.allPlayersDataSource.paginator = this.paginator
    }

    openDialog(): void {
        // const dialogRef = this.dialog.open(BrandFormComponent, {
        //     width: '40%',
        // })
        // dialogRef.afterClosed().subscribe((result) => {})
    }
}
