import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    public capiUrl: string;
    public suggestionsToken: string;

    constructor(private http: Http) { }

    public load() {
        return new Promise(resolve => {
            this.http.get('appConfig.json').map(res => res.json())
                .subscribe(data => {
                    this.capiUrl = data.capiUrl;
                    this.suggestionsToken = data.suggestionsToken;
                    resolve();
                });
        });
    }
}
