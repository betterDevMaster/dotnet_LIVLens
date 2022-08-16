import { Injectable } from '@angular/core'
import { ClubDim, LIVLensAPIClient } from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ClubManagementService {
    public allClubs = new BehaviorSubject<ClubDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor() {
        this.getAllClubs().then(() => console.log('clubs loaded'))
    }

    async getAllClubs() {
        const clubs = await this._apiService.equipment_GetClubs()

        this.allClubs.next(clubs)

        return clubs
    }
}
