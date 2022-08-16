import { Injectable } from '@angular/core'
import { FuseLoadingService } from '@fuse/services/loading'
import { BrandDim, LIVLensAPIClient } from 'app/api/api.generated.clients'
import { cloneDeep } from 'lodash'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BrandManagementService {
    public allBrands = new BehaviorSubject<BrandDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor(private _loadingService: FuseLoadingService) {
        this.getAllBrands().then(() => console.log('brands loaded'))
    }

    async getAllBrands() {
        this._loadingService.show()
        const brands = await this._apiService.brands_GetBrands()
        this._loadingService.hide()

        this.allBrands.next(brands)

        return brands
    }
}
