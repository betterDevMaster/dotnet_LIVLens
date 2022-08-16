import { TestBed } from '@angular/core/testing'

import { BrandManagementService } from './brand-management.service'

describe('BrandManagementService', () => {
    let service: BrandManagementService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(BrandManagementService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
