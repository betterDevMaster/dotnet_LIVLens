import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { BrandManagementService } from '../brand-management.service'

@Component({
    selector: 'app-brand-form',
    templateUrl: './brand-form.component.html',
    styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<BrandFormComponent>) {}

    ngOnInit(): void {}

    onNoClick(): void {
        this.dialogRef.close()
    }
}
