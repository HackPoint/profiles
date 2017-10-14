import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {RegistrationService} from './signup.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    constructor(private registration: RegistrationService) { }

    ngOnInit() { }
    register(registerForm: NgForm) {

    }
}
