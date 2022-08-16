import { Injectable } from '@angular/core'
import { FuseLoadingService } from '@fuse/services/loading'
import { LIVLensAPIClient, PlayerDim } from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class PlayerManagementService {
    public allPlayers = new BehaviorSubject<PlayerDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor(private _loadingService: FuseLoadingService) {
        this.getAllPlayers().then(() => console.log('players loaded'))
    }

    async getAllPlayers() {
        this._loadingService.show()
        const players = await this._apiService.players_GetAll()
        this._loadingService.hide()

        players.sort((a, b) => {
            const result = a.firstName.localeCompare(b.firstName)

            return result !== 0 ? result : a.lastName.localeCompare(b.lastName)
        })

        this.allPlayers.next(players)

        return players
    }
}
