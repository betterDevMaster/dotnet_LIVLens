import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { fuseAnimations } from '@fuse/animations'
import { FuseAlertType } from '@fuse/components/alert'
import { AuthService } from 'app/core/auth/auth.service'

import {
    AuthService as Auth0Service,
    IdToken,
    User,
} from '@auth0/auth0-angular'
import { zip } from 'rxjs'

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    }
    signInForm: UntypedFormGroup
    showAlert: boolean = false
    profileJson?: string

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        public auth0: Auth0Service,
        public authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('sign in init')

        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                'livtour@livlens.io',
                [Validators.required, Validators.email],
            ],
            password: ['liv2022', Validators.required],
            rememberMe: [''],
        })

        this._activatedRoute.queryParams.subscribe((params) => {
            console.log(params) // { orderby: "price" }
            const queryParams = this.getParams(params['redirectURL'])
            console.log(queryParams)

            zip(
                this.auth0.getIdTokenClaims(),
                this.auth0.getUser(),
                (idToken: IdToken, user: User) => ({ idToken, user })
            ).subscribe((pair) => {
                console.log('auth0 token', pair.idToken)
                if (pair.idToken) {
                    this.authService
                        .signInUsingToken(pair.idToken.__raw, pair.user)
                        .subscribe(
                            () => {
                                const redirectURL =
                                    this._activatedRoute.snapshot.queryParamMap.get(
                                        'redirectURL'
                                    ) || '/signed-in-redirect'
                                this._router.navigateByUrl(redirectURL)
                            },
                            (response) => {
                                console.log('error', response)
                                // Show the alert
                                this.showAlert = true
                            }
                        )
                }
            })
        })
    }

    getParams(str) {
        var queryString = str || window.location.search || ''
        var keyValPairs = []
        var params = {}
        queryString = queryString.replace(/.*?\?/, '')

        if (queryString.length) {
            keyValPairs = queryString.split('&')
            for (let pairNum in keyValPairs) {
                var key = keyValPairs[pairNum].split('=')[0]
                if (!key.length) continue
                if (typeof params[key] === 'undefined') params[key] = []
                params[key].push(keyValPairs[pairNum].split('=')[1])
            }
        }
        return params
    }

    signinAuth0() {
        this.auth0
            .loginWithRedirect({
                scope: 'openid profile email',
            })
            .subscribe((res) => {
                console.log(res)
                alert(JSON.stringify(res))
            })
        let _this = this
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        // if ( this.signInForm.invalid )
        // {
        //     return;
        // }
        // // Disable the form
        // this.signInForm.disable();
        // // Hide the alert
        // this.showAlert = false;
        // // Sign in
        // this._authService.signIn(this.signInForm.value)
        //     .subscribe(
        //         () => {
        //             // Set the redirect url.
        //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        //             // to the correct page after a successful sign in. This way, that url can be set via
        //             // routing file and we don't have to touch here.
        //             const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        //             // Navigate to the redirect url
        //             this._router.navigateByUrl(redirectURL);
        //         },
        //         (response) => {
        //             // Re-enable the form
        //             this.signInForm.enable();
        //             // Reset the form
        //             this.signInNgForm.resetForm();
        //             // Set the alert
        //             this.alert = {
        //                 type   : 'error',
        //                 message: 'Wrong email or password'
        //             };
        //             // Show the alert
        //             this.showAlert = true;
        //         }
        //     );
    }
}
