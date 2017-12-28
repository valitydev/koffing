import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from 'koffing/backend/koffing-http.service';
import { ConfigService } from './config.service';
import { Contract } from './model';

@Injectable()
export class ContractService {

    private endpoint: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) { }

    public getContracts(): Observable<Contract[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getContractByID(contractID: string): Observable<Contract> {
        return this.http.get(`${this.endpoint}/${contractID}`).map((res) => res.json());
    }
}
