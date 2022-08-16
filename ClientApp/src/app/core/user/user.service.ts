import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, ReplaySubject, tap } from 'rxjs'
import { AuthService, User } from '@auth0/auth0-angular'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1)

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _auth0: AuthService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value)
    }

    get user$(): Observable<User> {
        return this._user.asObservable()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._auth0.getUser().pipe(
            tap((user) => {
                this._user.next(user)
                console.log(user)
            })
        )
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response)
            })
        )
    }
}
