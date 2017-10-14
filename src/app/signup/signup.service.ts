import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RegistrationService {

    constructor(private http: Http) {
    }

    register(user: User) {

    }
}
export interface User {
    id: number;
    email: string;
    password: string;
    fullName: string;
}
