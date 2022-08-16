import { Injectable } from '@angular/core'
import { BrandDim, LIVLensAPIClient } from 'app/api/api.generated.clients'
import { cloneDeep } from 'lodash'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BrandManagementService {
    public allBrands = new BehaviorSubject<BrandDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor() {
        console.log('bms constructor')
        this.getAllBrands().then(() => console.log('brands loaded'))
        console.log('exit constructor')
    }

    async getAllBrands() {
        const brands = await this._apiService.brands_GetBrands()

        this.allBrands.next(brands)

        return brands
    }
}
