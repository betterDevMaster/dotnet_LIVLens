import { Injectable } from '@angular/core'
import { LivLensApiService } from 'app/core/liv-lens-api/liv-lens-api-service'
import BRAND_DIM from 'app/models/brand'
import { cloneDeep } from 'lodash'

@Injectable({
    providedIn: 'root',
})
export class BrandManagementService {
    public allBrands: BRAND_DIM[] = []

    constructor(private _apiService: LivLensApiService) {
        this.getAllBrands()
    }

    async getAllBrands() {
        const brands = await this._apiService.getBrands()

        this.allBrands = cloneDeep(brands)
        return brands
    }
}
