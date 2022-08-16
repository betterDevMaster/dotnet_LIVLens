import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    @ViewChild('drawer') drawer: MatDrawer

    drawerMode: 'over' | 'side' = 'side'
    drawerOpened: boolean = true

    constructor() {}

    ngOnInit(): void {}
}
