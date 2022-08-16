import { Injectable } from '@angular/core'
import { EventDim, LIVLensAPIClient } from 'app/api/api.generated.clients'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class EventManagementService {
    public allEvents = new BehaviorSubject<EventDim[]>([])
    private _apiService = new LIVLensAPIClient()

    constructor() {
        this.getAllEvents().then(() => console.log('events loaded'))
    }

    async getAllEvents() {
        const events = await this._apiService.events_GetAll()

        events.sort((a, b) =>
            a.eventDate.getTime() > b.eventDate.getTime() ? 1 : -1
        )

        this.allEvents.next(events)

        console.log(events)

        return events
    }
}
