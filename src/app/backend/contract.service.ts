import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { Contract as ContractNew } from './model/contract/contract';

@Injectable()
export class ContractService {

    private endpoint: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getContracts(): Observable<ContractNew[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getContractByID(contractID: string): Observable<ContractNew> {
        return this.http.get(`${this.endpoint}/${contractID}`).map((res) => res.json());
    }
}
