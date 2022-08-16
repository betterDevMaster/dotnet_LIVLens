import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of, switchMap, throwError } from 'rxjs'
import { AuthUtils } from 'app/core/auth/auth.utils'
import { UserService } from 'app/core/user/user.service'
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular'

@Injectable()
export class AuthService {
    private get _authenticated() {
        return this.auth0.isAuthenticated$
    }

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private auth0: Auth0Service,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token)
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? ''
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email)
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password)
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(accessToken: string, user: User): Observable<any> {
        // Replace the access token with the new one if it's available on
        // the response object.
        //
        // This is an added optional step for better security. Once you sign
        // in using the token, you should generate a new one on the server
        // side and attach it to the response object. Then the following
        // piece of code can replace the token with the refreshed one.

        console.log('sign in using token')
        console.log(accessToken, user)

        if (accessToken) {
            this.accessToken = accessToken
        }

        // Store the user on the user service
        this._userService.user = user

        // Return true
        return of(true)
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken')

        // Logout from auth0
        this.auth0.logout({ returnTo: document.location.origin })

        // Return the observable
        return of(true)
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check the access token availability
        if (!this.accessToken) {
            return of(false)
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false)
        }

        return this._authenticated
    }
}
