import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
    BrandDim,
    BrandModelDim,
    ProductTypeDim,
    SurveyFact,
} from 'app/api/api.generated.clients'
import { BrandManagementService } from 'app/modules/admin/brand-management/brand-management.service'
import { EquipmentManagementService } from 'app/modules/admin/club-management/equipment-management.service'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Component({
    selector: 'app-survey-fact-edit',
    templateUrl: './survey-fact-edit.component.html',
    styleUrls: ['./survey-fact-edit.component.scss'],
})
export class SurveyFactEditComponent implements OnInit {
    @Input() surveyFact: SurveyFact
    @Input() category: string = 'CLUB'

    brandModelControl = new FormControl<string | BrandModelDim>('')
    brandModelOptions: Observable<BrandModelDim[]>

    productTypes: ProductTypeDim[] = []
    brandMap = new Map<number, BrandDim>()
    brandModelMap = new Map<number, BrandModelDim>()
    brandModels: BrandModelDim[] = []

    constructor(
        private _equipMgmtSvc: EquipmentManagementService,
        private _brandMgmtSvc: BrandManagementService
    ) {
        this._equipMgmtSvc.allProductTypes.subscribe(
            (pts) =>
                (this.productTypes = pts.filter(
                    (pt) => pt.productCategory === this.category
                ))
        )

        this._equipMgmtSvc.allBrandModels.subscribe((bms) => {
            this.brandModelMap = new Map<number, BrandModelDim>()
            bms.forEach((bm) => this.brandModelMap.set(bm.brandModelId, bm))
            this.brandModels = Array.from(bms.values())
        })

        this._brandMgmtSvc.allBrands.subscribe((brands) => {
            this.brandMap = new Map<number, BrandDim>()
            brands.forEach((brand) => this.brandMap.set(brand.brandId, brand))
        })
    }

    ngOnInit(): void {
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

    brandModelDisplay = (bm: BrandModelDim): string => {
        console.log(this)
        return bm && bm.model
            ? `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
            : ''
    }

    private _filterBrandModels(value: string): BrandModelDim[] {
        const filterValue = value.toLowerCase()

        return this.brandModels.filter((bm) =>
            `${this.brandMap.get(bm.brandId).brand} ${bm?.model}`
                .toLowerCase()
                .includes(filterValue)
        )
    }
}
