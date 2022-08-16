import { Injectable } from '@angular/core'
import BRAND_DIM from 'app/models/brand'
import EVENT_DIM from 'app/models/event'

@Injectable({
    providedIn: 'root',
})
export class LivLensApiService {
    private baseURL =
        'https://26dtoj43qk.execute-api.us-east-1.amazonaws.com/production'

    constructor() {}

    getEvents = async (): Promise<Array<EVENT_DIM>> => {
        const response = await fetch(`${this.baseURL}/events`)

        return response.json()
    }

    putEvent = async (eventToPut: EVENT_DIM): Promise<EVENT_DIM> => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventToPut),
        }

        const response = await fetch(`${this.baseURL}/events`, requestOptions)

        return await response.json()
    }

    getBrands = async (): Promise<Array<BRAND_DIM>> => {
        const response = await fetch(`${this.baseURL}/brands`)
        const json = await response.json()

        return json.brands
    }
}
