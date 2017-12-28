import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { Customer } from './model';

@Injectable()
export class CustomerService {

    private endpoint: string = `${this.config.capiUrl}/processing/customers`;

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) { }

    public getCustomerById(customerID: string): Observable<Customer> {
        return this.http.get(`${this.endpoint}/${customerID}`).map((res) => res.json());
    }
}
