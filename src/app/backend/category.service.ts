import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from 'koffing/backend/capi-http.service';
import { Category } from './model/category';
import { ConfigService } from './config.service';

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
