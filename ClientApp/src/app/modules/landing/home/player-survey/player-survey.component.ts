import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
    BrandDim,
    BrandModelDim,
    ClubDim,
    EventDim,
    PlayerDim,
} from 'app/api/api.generated.clients'
import { BrandManagementService } from 'app/modules/admin/brand-management/brand-management.service'
import { EquipmentManagementService } from 'app/modules/admin/club-management/equipment-management.service'
import { EventManagementService } from 'app/modules/admin/event-management/event-management.service'
import { PlayerManagementService } from 'app/modules/admin/player-management/player-management.service'
import { Observable, of } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Component({
    selector: 'app-player-survey',
    templateUrl: './player-survey.component.html',
    styleUrls: ['./player-survey.component.scss'],
})
export class PlayerSurveyComponent implements OnInit {
    eventControl = new FormControl<string | EventDim>('')
    playerControl = new FormControl<string | PlayerDim>('')
    brandModelControl = new FormControl<string | ClubDim>('')

    brandMap: Map<number, BrandDim> = new Map()
    events: EventDim[] = []
    players: PlayerDim[] = []
    brandModels: BrandModelDim[] = []

    eventOptions: Observable<EventDim[]>
    playerOptions: Observable<PlayerDim[]>
    brandModelOptions: Observable<BrandModelDim[]>

    step = 0

    constructor(
        private _eventService: EventManagementService,
        private _playerManagementService: PlayerManagementService,
        private _equipMgmtService: EquipmentManagementService,
        private _brandMgmtSvc: BrandManagementService
    ) {
        this._eventService.allEvents.subscribe((events) => {
            this.events = [...events]
        })

        this._playerManagementService.allPlayers.subscribe((players) => {
            this.players = [...players]
        })

        this._brandMgmtSvc.allBrands.subscribe((brands) => {
            this.brandMap = new Map<number, BrandDim>()
            brands.forEach((b) => this.brandMap.set(b.brandId, b))
            console.log(this.brandMap)
        })

        this._equipMgmtService.allBrandModels.subscribe((brandModels) => {
            this.brandModels = [...brandModels]
        })
    }

    ngOnInit() {
        //events autocomplete
        this.eventOptions = this.eventControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
                const name =
                    typeof value === 'string' ? value : value?.eventName
                return name
                    ? this._filterEvents(name as string)
                    : this.events.slice()
            })
        )

        //player autocomplete
        this.playerOptions = this.playerControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
                const name =
                    typeof value === 'string'
                        ? value
                        : `${value?.firstName} ${value?.lastName}`
                return name
                    ? this._filterPlayers(name as string)
                    : this.players.slice()
            })
        )

        //clubs autocomplete
        this.brandModelOptions = this.brandModelControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
                const name =
                    typeof value === 'string'
                        ? value
                        : `${this.brandMap.get(value.brandId).brand} ${
                              value?.model
                          }`
                return name
                    ? this._filterBrandModels(name as string)
                    : this.brandModels.slice()
            })
        )
    }

    private _filterEvents(value: string): EventDim[] {
        const filterValue = value.toLowerCase()

        return this.events.filter((event) =>
            event.eventName.toLowerCase().includes(filterValue)
        )
    }

    private _filterPlayers(value: string): PlayerDim[] {
        const filterValue = value.toLowerCase()

        return this.players.filter((player) =>
            `${player?.firstName} ${player?.lastName}`
                .toLowerCase()
                .includes(filterValue)
        )
    }

    private _filterBrandModels(value: string): ClubDim[] {
        const filterValue = value.toLowerCase()

        return this.brandModels.filter((bm) =>
            `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
                .toLowerCase()
                .includes(filterValue)
        )
    }

    setStep(index: number) {
        this.step = index
    }

    nextStep() {
        this.step++
    }

    prevStep() {
        this.step--
    }

    eventDisplay(event: EventDim): string {
        return event && event.eventName ? event.eventName : ''
    }

    playerDisplay(player: PlayerDim): string {
        return player && player.firstName
            ? `${player.firstName} ${player.lastName}`
            : ''
    }

    brandModelDisplay(bm: BrandModelDim): string {
        return bm && bm.model
            ? `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
            : ''
    }
}
