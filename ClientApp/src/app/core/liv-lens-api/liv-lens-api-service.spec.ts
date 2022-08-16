import { TestBed } from '@angular/core/testing'

import { LivLensApiService } from './liv-lens-api-service'

describe('LivLensApiService', () => {
    let service: LivLensApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(LivLensApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
