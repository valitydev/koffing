import { Component, OnInit } from '@angular/core';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { LegalEntityTypeEnum } from 'koffing/backend';
import { SelectItem } from 'koffing/common/select/select-item';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'init-create-shop.component.pug',
    styleUrls: ['init-create-shop.component.less']
})
export class InitCreateShopComponent implements OnInit {
    public types: SelectItem[] = [
        {
            value: LegalEntityTypeEnum.RussianLegalEntity,
            label: 'Ведущее деятельность под юрисдикцией РФ'
        },
        { value: LegalEntityTypeEnum.InternationalLegalEntity, label: 'Международное' }
    ];

    constructor(private breadcrumbBroadcaster: BreadcrumbBroadcaster, private router: Router) {}

    public ngOnInit() {
        this.breadcrumbBroadcaster.fire([{ label: 'Создание магазина' }]);
    }

    public next(entityType: LegalEntityTypeEnum) {
        switch (entityType) {
            case LegalEntityTypeEnum.RussianLegalEntity:
                this.router.navigate(['/shop/create/resident']);
                break;
            case LegalEntityTypeEnum.InternationalLegalEntity:
                this.router.navigate(['/shop/create/nonresident']);
                break;
        }
    }
}
