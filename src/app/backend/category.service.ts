import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from './model/category';
import { ConfigService } from './config.service';

@Injectable()
export class CategoryService {

    private endpoint = `${this.config.capiUrl}/processing/categories`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    /**
     * @deprecated Use getCategoriesObs
     */
    public getCategories(): Promise<Category[]> {
        return this.http.get(this.endpoint)
            .toPromise()
            .then(response => response.json());
    }

    public getCategoriesObs(): Observable<Category[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getCategoryByID(categoryID: number): Observable<Category> {
        return this.http.get(`${this.endpoint}/${categoryID}`).map((res) => res.json());
    }
}
