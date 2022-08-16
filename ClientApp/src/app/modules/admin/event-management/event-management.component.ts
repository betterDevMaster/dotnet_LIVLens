import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { EventDim } from 'app/api/api.generated.clients'
import { EventManagementService } from './event-management.service'

@Component({
    selector: 'app-event-management',
    templateUrl: './event-management.component.html',
    styleUrls: ['./event-management.component.scss'],
})
export class EventManagementComponent implements OnInit {
    public displayedColumns = [
        'eventName',
        'city',
        'state',
        'country',
        'courseName',
        'eventDate',
        'coursePar',
    ]

    @ViewChild('paginator', { static: true }) paginator: MatPaginator

    allEventsDataSource = new MatTableDataSource<EventDim>([])

    constructor(
        public eventMgmtService: EventManagementService,
        public dialog: MatDialog
    ) {
        this.allEventsDataSource.paginator = this.paginator
        this.eventMgmtService.allEvents.subscribe((events) => {
            this.allEventsDataSource.data = events
        })
    }

    ngOnInit(): void {}

    openDialog(): void {
        // const dialogRef = this.dialog.open(BrandFormComponent, {
        //     width: '40%',
        // })
        // dialogRef.afterClosed().subscribe((result) => {})
    }
}
