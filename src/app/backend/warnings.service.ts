import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WarningsService {

    public loginWarnings: Subject<string[]> = new Subject();

    private isLoaded = false;

    constructor(private http: Http) {
        if (!this.isLoaded) {
            this.init();
        }
    }

    private init() {
        this.http.get(`warningConfig.json?timestamp=${ new Date().getTime() }`).map(res => res.json())
            .subscribe(data => {
                this.loginWarnings.next(data.loginWarnings);
                this.isLoaded = true;
            });
    }
}
