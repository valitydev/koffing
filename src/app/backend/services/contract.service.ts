import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import { ConfigService } from './config.service';
import { Contract } from '../classes/contract.class';
import { PayoutTool } from '../classes/payout-tool.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';

@Injectable()
export class ContractService {

    private contractsUrl: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(private http: Http, private config: ConfigService) {
    }

    public getContracts(): Promise<Contract[]> {
        return this.http.get(this.contractsUrl)
            .toPromise()
            .then(response => response.json());
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
