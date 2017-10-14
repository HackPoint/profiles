import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {NgForm} from '@angular/forms';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angular4-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    name: string;
    password: string;
    loggedIn: boolean;

    constructor(public router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.loggedIn = <boolean>JSON.parse(localStorage.getItem('isLoggedin'));
        if (this.loggedIn) {
            this.router.navigateByUrl('dashboard');
        }
    }

    onLoggedin(form: NgForm) {
        localStorage.removeItem('isLoggedin');
        const formValue = form.value;
        if(formValue.email && formValue.password) {
            // save to db users
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('dashboard');
        }
    }

    googleLogin() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
            if (user !== null) {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigateByUrl('dashboard');
            }
        }, (error: any) => {
            console.log(JSON.stringify(error, undefined, 2));
        });
    }
}
