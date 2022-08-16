import { Injectable } from '@angular/core'
import { LIVLensAPIClient, PlayerDim } from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class PlayerManagementService {
    public allPlayers = new BehaviorSubject<PlayerDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor() {
        this.getAllPlayers().then(() => console.log('players loaded'))
    }

    async getAllPlayers() {
        const players = await this._apiService.players_GetAll()

        players.sort((a, b) => {
            const result = a.firstName.localeCompare(b.firstName)

            return result !== 0 ? result : a.lastName.localeCompare(b.lastName)
        })

        this.allPlayers.next(players)

        console.log(players)

        return players
    }
}
