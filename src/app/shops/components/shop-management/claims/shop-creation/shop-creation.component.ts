import { Component, Input, OnInit } from '@angular/core';

import { ShopCreation } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-creation',
    templateUrl: './shop-creation.component.pug'
})
export class ShopCreationComponent implements OnInit {

    @Input()
    public changeset: ShopCreation;

    public showPanel: boolean = false;

    public shop: any;

    public ngOnInit() {
        this.shop = this.changeset.shop;
    }

    public show() {
        this.showPanel = !this.showPanel;
    }
}
