import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Contract } from './model/contract';
import { PayoutTool } from './model/payout-tool';
import { ContractParams } from './model/contract-params';
import { PayoutToolParams } from './model/payout-tool-params';

@Injectable()
export class ContractService {

    private contractsUrl: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getContracts(): Promise<Contract[]> {
        return this.http.get(this.contractsUrl)
            .toPromise()
            .then(response => response.json());
    }

    public getContractsObservable(): Observable<Contract[]> {
        return this.http.get(this.contractsUrl)
            .map((res) => res.json());
    }

    public getContract(contractID: number): Promise<Contract> {
        return this.http.get(`${this.contractsUrl}/${contractID}`)
            .toPromise()
            .then(response => response.json() as Contract);
    }

    public createContract(request: ContractParams): Promise<any> {
        return this.http.post(this.contractsUrl, request)
            .toPromise()
            .then(response => response.json());
    }

    public getPayoutTools(contractID: number): Promise<PayoutTool[]> {
        return this.http.get(`${this.contractsUrl}/${contractID}/payout_tools`)
            .toPromise()
            .then(response => response.json() as PayoutTool[]);
    }

    public createPayoutTool(contractID: number, payoutToolParams: PayoutToolParams): Promise<any> {
        return this.http.post(`${this.contractsUrl}/${contractID}/payout_tools`, payoutToolParams)
            .toPromise()
            .then(response => response.json());
    }
}
