import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import { Category } from './model';

@Injectable()
export class CategoryService {

    private endpoint = `${this.config.capiUrl}/processing/categories`;

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getCategories(): Observable<Category[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getCategoryByID(categoryID: number): Observable<Category> {
        return this.http.get(`${this.endpoint}/${categoryID}`).map((res) => res.json());
    }
}
