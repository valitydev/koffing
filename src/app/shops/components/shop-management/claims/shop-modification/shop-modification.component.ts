import { Component, Input, OnInit } from '@angular/core';

import { ShopModification } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-modification',
    templateUrl: './shop-modification.component.pug'
})
export class ShopModificationComponent implements OnInit {

    @Input()
    public changeset: ShopModification;

    public showPanel: boolean = false;

    public isModification: boolean = false;

    public details: any;

    public ngOnInit() {
        this.details = this.changeset.details.details;
        this.isModification = this.changeset.details.modificationType === 'ShopModification';
    }

    public show() {
        this.showPanel = !this.showPanel;
    }
}
