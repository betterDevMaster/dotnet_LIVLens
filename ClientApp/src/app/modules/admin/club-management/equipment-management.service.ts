import { Injectable } from '@angular/core'
import { FuseLoadingService } from '@fuse/services/loading'
import {
    BrandModelDim,
    ClubDim,
    LIVLensAPIClient,
    ProductTypeDim,
} from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class EquipmentManagementService {
    private _apiService = new LIVLensAPIClient()

    public allClubs = new BehaviorSubject<ClubDim[]>([])
    public allBrandModels = new BehaviorSubject<BrandModelDim[]>([])
    public allProductTypes = new BehaviorSubject<ProductTypeDim[]>([])

    constructor(private _loadingService: FuseLoadingService) {
        this.getAllClubs().then()
        this.getAllBrandModels().then()
        this.getAllProductTypes().then()
    }

    async getAllClubs() {
        this._loadingService.show()
        const clubs = await this._apiService.equipment_GetClubs()
        this._loadingService.hide()

        this.allClubs.next(clubs)

        return clubs
    }

    async getAllBrandModels() {
        this._loadingService.show()
        const brandModels = await this._apiService.equipment_GetBrandModels()
        this._loadingService.hide()

        this.allBrandModels.next(brandModels)

        return brandModels
    }

    async getAllProductTypes() {
        this._loadingService.show()
        const productTypes = await this._apiService.equipment_GetProductTypes()
        this._loadingService.hide()

        this.allProductTypes.next(productTypes)

        return productTypes
    }
}
