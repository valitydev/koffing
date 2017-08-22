import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';
import { ShopCreation } from 'koffing/backend';

@Component({
    selector: 'kof-shop-creation-details',
    templateUrl: 'shop-creation-details.component.pug'
})
export class ShopCreationDetailsComponent implements OnChanges {

    @Input()
    public shopCreations: ShopCreation[];

    public shopCreation: ShopCreation;

    public ngOnChanges() {
        this.shopCreation = last(this.shopCreations);
    }

}
