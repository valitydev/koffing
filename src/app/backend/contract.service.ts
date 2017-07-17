import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { PayoutTool } from './model/payout-tool';
import { ContractParams } from './model/contract-params';
import { PayoutToolParams } from './model/payout-tool-params';
import { Contract } from './model/contract';
import { Contract as ContractNew } from './model/contract/contract';

@Injectable()
export class ContractService {

    private endpoint: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    /**
     * @deprecated Use getContractsObs
     */
    public getContracts(): Promise<Contract[]> {
        return this.http.get(this.endpoint)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @deprecated Use getContractsObs
     */
    public getContractsObservable(): Observable<Contract[]> {
        return this.http.get(this.endpoint)
            .map((res) => res.json());
    }

    /**
     * @deprecated Use getContractByID
     */
    public getContract(contractID: number): Promise<Contract> {
        return this.http.get(`${this.endpoint}/${contractID}`)
            .toPromise()
            .then(response => response.json() as Contract);
    }

    /**
     * @deprecated Use ClaimService
     */
    public createContract(request: ContractParams): Promise<any> {
        return this.http.post(this.endpoint, request)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @deprecated Use PayoutToolService
     */
    public getPayoutTools(contractID: number): Promise<PayoutTool[]> {
        return this.http.get(`${this.endpoint}/${contractID}/payout_tools`)
            .toPromise()
            .then(response => response.json() as PayoutTool[]);
    }

    /**
     * @deprecated Use ClaimService
     */
    public createPayoutTool(contractID: number, payoutToolParams: PayoutToolParams): Promise<any> {
        return this.http.post(`${this.endpoint}/${contractID}/payout_tools`, payoutToolParams)
            .toPromise()
            .then(response => response.json());
    }

    public getContractsObs(): Observable<ContractNew[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getContractByID(contractID: string): Observable<ContractNew> {
        return this.http.get(`${this.endpoint}/${contractID}`).map((res) => res.json());
    }

    // TODO getContractAdjustments, getContractAdjustmentsByID
}
