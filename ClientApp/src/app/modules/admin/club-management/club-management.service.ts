import { Injectable } from '@angular/core'
import { FuseLoadingService } from '@fuse/services/loading'
import { ClubDim, LIVLensAPIClient } from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ClubManagementService {
    public allClubs = new BehaviorSubject<ClubDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor(private _loadingService: FuseLoadingService) {
        this.getAllClubs().then(() => console.log('clubs loaded'))
    }

    async getAllClubs() {
        this._loadingService.show()
        const clubs = await this._apiService.equipment_GetClubs()
        this._loadingService.hide()

        this.allClubs.next(clubs)

        return clubs
    }
}
