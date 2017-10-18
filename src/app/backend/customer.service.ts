import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import { Customer } from './model/customer';

@Injectable()
export class CustomerService {

    private endpoint: string = `${this.config.capiUrl}/processing/customers`;

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getCustomerById(customerID: string): Observable<Customer> {
        return this.http.get(`${this.endpoint}/${customerID}`).map((res) => res.json());
    }
}
