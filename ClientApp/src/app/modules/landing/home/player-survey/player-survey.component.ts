import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
    BrandDim,
    BrandModelDim,
    ClubDim,
    EventDim,
    PlayerDim,
    ProductTypeDim,
    SurveyFact,
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
    brandModelControl = new FormControl<string | BrandModelDim>('')

    selectedSubCategory: string = null

    subCategoryProductTypes: string[] = []
    selectedProductType: string = null

    cascadeToSubCategories = true

    brandMap: Map<number, BrandDim> = new Map()
    events: EventDim[] = []
    players: PlayerDim[] = []
    brandModelsMap: Map<number, BrandModelDim> = new Map<
        number,
        BrandModelDim
    >()
    brandModels: BrandModelDim[] = []

    productTypesMap: Map<number, ProductTypeDim> = new Map<
        number,
        ProductTypeDim
    >()

    clubProductTypeSubCategories: string[] = []

    eventOptions: Observable<EventDim[]>
    playerOptions: Observable<PlayerDim[]>
    brandModelOptions: Observable<BrandModelDim[]>

    public surveyFacts = new Map<string, SurveyFact[]>()
    step = 0

    constructor(
        private _eventService: EventManagementService,
        private _playerManagementService: PlayerManagementService,
        private _equipMgmtService: EquipmentManagementService,
        private _brandMgmtSvc: BrandManagementService
    ) {
        this.setupSubscriptions()
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

    private _filterBrandModels(value: string): BrandModelDim[] {
        const filterValue = value.toLowerCase()

        return this.brandModels.filter((bm) =>
            `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
                .toLowerCase()
                .includes(filterValue)
        )
    }

    clubApply() {
        const currentBrandModel = <BrandModelDim>this.brandModelControl.value
        const productTypeArray = Array.from(this.productTypesMap.values())

        const subcatFacts = this.surveyFacts.get(this.selectedSubCategory)

        console.log(`subcat facts for ${this.selectedSubCategory}`, subcatFacts)

        if (this.cascadeToSubCategories) {
            subcatFacts.forEach(
                (fact) => (fact.brandModelId = currentBrandModel.brandModelId)
            )
        } else {
            const selectedProductTypeId = productTypeArray.find(
                (pt) => pt.productType == this.selectedProductType
            ).productTypeId
            const targetFact = subcatFacts.find(
                (fact) => fact.productTypeId == selectedProductTypeId
            )

            targetFact.brandModelId = currentBrandModel.brandModelId
        }
    }

    populateClubNumDropdownOnSubCategorySelect() {
        const productTypes = Array.from(this.productTypesMap.values())
        this.subCategoryProductTypes = productTypes
            .filter((pt) => pt.productSubCategory == this.selectedSubCategory)
            .map((pt) => pt.productType)
            .sort()
    }

    private setupSubscriptions() {
        this._eventService.allEvents.subscribe((svcEvents) => {
            this.events = [...svcEvents]

            const now = new Date()

            svcEvents.sort(function (a, b) {
                var distancea = Math.abs(now.getTime() - a.eventDate.getTime())
                var distanceb = Math.abs(now.getTime() - b.eventDate.getTime())
                return distancea - distanceb // sort a before b when the distance is smaller
            })

            this.eventControl.setValue(svcEvents[0])

            this.events.sort((a, b) =>
                a.eventDate.getTime() > b.eventDate.getTime() ? 1 : -1
            )
        })

        this._playerManagementService.allPlayers.subscribe((players) => {
            this.players = [...players]
        })

        this._brandMgmtSvc.allBrands.subscribe((brands) => {
            this.brandMap = new Map<number, BrandDim>()
            brands.forEach((b) => this.brandMap.set(b.brandId, b))
        })

        this._equipMgmtService.allBrandModels.subscribe((brandModels) => {
            this.brandModels = brandModels
            this.brandModelsMap = new Map<number, BrandModelDim>()
            brandModels.forEach((bm) =>
                this.brandModelsMap.set(bm.brandModelId, bm)
            )
        })

        this._equipMgmtService.allProductTypes.subscribe((productTypes) => {
            this.productTypesMap = new Map<number, ProductTypeDim>()
            productTypes.forEach((pt) =>
                this.productTypesMap.set(pt.productTypeId, pt)
            )
            this.surveyFacts = this.getDefaultSurveyFacts()

            this.clubProductTypeSubCategories = [
                ...new Set(
                    productTypes
                        .filter((pt) => pt.internalAttrCategory == 'CLUB')
                        .map((pt) => pt.productSubCategory)
                ),
            ]
        })
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

    brandModelDisplay = (bm: BrandModelDim): string => {
        console.log(this)
        return bm && bm.model
            ? `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
            : ''
    }

    subCategoryHasMultipleTypes(subType: string) {
        return (
            [...this.productTypesMap.values()].filter(
                (pt) => pt.productSubCategory == subType
            ).length > 1
        )
    }

    getDefaultSurveyFacts() {
        const defaultMap = new Map<string, SurveyFact[]>()
        const now = new Date()
        const productTypeArray = Array.from(this.productTypesMap.values())

        // - - - IRONS - - -
        const irons = productTypeArray.filter(
            (pt) => pt.productSubCategory == 'IRON'
        )

        const ironDefaults = [
            ...irons.map((ironProductType) => {
                return new SurveyFact({
                    productTypeId: ironProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('IRON', ironDefaults)

        // - - - WOOD - - -
        const woods = productTypeArray.filter(
            (pt) => pt.productSubCategory == 'WOOD'
        )

        const woodDefaults = [
            ...woods.map((woodsProductType) => {
                return new SurveyFact({
                    productTypeId: woodsProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('WOOD', woodDefaults)

        // - - - WEDGE - - -
        const wedges = productTypeArray.filter(
            (pt) =>
                pt.productSubCategory == 'WEDGE' &&
                ['PW', 'GW', 'LW'].includes(pt.productType)
        )

        const wedgeDefaults = [
            ...wedges.map((wedgeProductType) => {
                return new SurveyFact({
                    productTypeId: wedgeProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('WEDGE', wedgeDefaults)

        // - - - DRIVER - - -
        const drivers = productTypeArray.filter(
            (pt) => pt.productSubCategory == 'DRIVER'
        )

        const driverDefaults = [
            ...drivers.map((driverProductType) => {
                return new SurveyFact({
                    productTypeId: driverProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('DRIVER', driverDefaults)

        // - - - PUTTER - - -
        const putters = productTypeArray.filter(
            (pt) => pt.productSubCategory == 'PUTTER'
        )

        const putterDefaults = [
            ...putters.map((putterProductType) => {
                return new SurveyFact({
                    productTypeId: putterProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('PUTTER', putterDefaults)

        // - - - HYBRID - - -
        const hybrids = productTypeArray.filter(
            (pt) => pt.productSubCategory == 'HYBRID'
        )

        const hybridDefaults = [
            ...hybrids.map((hybridProductType) => {
                return new SurveyFact({
                    productTypeId: hybridProductType.productTypeId,
                    addDate: now,
                    updateDate: now,
                })
            }),
        ]

        defaultMap.set('HYBRID', hybridDefaults)

        console.log(defaultMap)

        return defaultMap
    }
}
