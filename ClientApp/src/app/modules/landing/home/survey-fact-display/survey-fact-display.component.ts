import { Component, Input, OnInit } from '@angular/core'
import {
    BrandDim,
    BrandModelDim,
    ProductTypeDim,
    SurveyFact,
} from 'app/api/api.generated.clients'
import { BrandManagementService } from 'app/modules/admin/brand-management/brand-management.service'
import { EquipmentManagementService } from 'app/modules/admin/club-management/equipment-management.service'

@Component({
    selector: 'app-survey-fact-display',
    templateUrl: './survey-fact-display.component.html',
    styleUrls: ['./survey-fact-display.component.scss'],
})
export class SurveyFactDisplayComponent implements OnInit {
    @Input() surveyFacts: SurveyFact[]

    productTypeMap = new Map<number, ProductTypeDim>()
    brandMap = new Map<number, BrandDim>()
    brandModelMap = new Map<number, BrandModelDim>()

    constructor(
        private _equipMgmtSvc: EquipmentManagementService,
        private _brandMgmtSvc: BrandManagementService
    ) {
        this._equipMgmtSvc.productTypeMap.subscribe(
            (ptMap) => (this.productTypeMap = ptMap)
        )

        this._equipMgmtSvc.allBrandModels.subscribe((bms) => {
            this.brandModelMap = new Map<number, BrandModelDim>()
            bms.forEach((bm) => this.brandModelMap.set(bm.brandModelId, bm))
        })

        this._brandMgmtSvc.allBrands.subscribe((brands) => {
            this.brandMap = new Map<number, BrandDim>()
            brands.forEach((brand) => this.brandMap.set(brand.brandId, brand))
        })
    }

    ngOnInit(): void {}
}
