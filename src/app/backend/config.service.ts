import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    public capiUrl: string;
    public wapiUrl: string;
    public checkoutUrl: string;
    public suggestionsToken: string;
    public supportEmail: string;
    public shortenUrlEndpoint: string;

    constructor(private http: Http) { }

    public load() {
        return new Promise(resolve => {
            this.http.get(`appConfig.json?timestamp=${new Date().getTime()}`).map(res => res.json())
                .subscribe(data => {
                    this.capiUrl = `${data.capiEndpoint}/v2`;
                    this.wapiUrl = `${data.capiEndpoint}/wallet/v0`;
                    this.checkoutUrl = `${data.checkoutEndpoint}`;
                    this.suggestionsToken = data.suggestionsToken;
                    this.supportEmail = data.supportEmail;
                    this.shortenUrlEndpoint = data.shortenUrlEndpoint;
                    resolve();
                });
        });
    }
}
