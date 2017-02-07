import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';

@Injectable()
export class AccountService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public getAccount(id: string): Promise<any> {
        return this.http.get(`${this.config.capiUrl}/processing/accounts/${id}`)
            .toPromise()
            .then(response => response.json());
    }
}
