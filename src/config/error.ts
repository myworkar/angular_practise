import { Injector, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Error {
    public static login = "Invalid credentials";
    constructor() {

    }
    message: String;
    status: boolean;
}

