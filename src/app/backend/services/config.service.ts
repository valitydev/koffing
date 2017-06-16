import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    public capiUrl: string;
    public suggestionsToken: string;
    public supportEmail: string;

    constructor(private http: Http) { }

    public load() {
        return new Promise(resolve => {
            this.http.get('appConfig.json').map(res => res.json())
                .subscribe(data => {
                    this.capiUrl = `${data.capiEndpoint}/v1`;
                    this.suggestionsToken = data.suggestionsToken;
                    this.supportEmail = data.supportEmail;
                    resolve();
                });
        });
    }
}
