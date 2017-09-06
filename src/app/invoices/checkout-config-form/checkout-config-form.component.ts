import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { HOLD_EXPIRATION } from 'koffing/backend/constants/hold-expiration';

@Component({
    selector: 'kof-checkout-config-form',
    templateUrl: './checkout-config-form.component.pug',
    styleUrls: ['./checkout-config-form.component.less']
})
export class CheckoutConfigFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public holdExpirationItems: SelectItem[];

    public ngOnInit() {
        this.holdExpirationItems = [
            new SelectItem(HOLD_EXPIRATION.cancel, 'в пользу плательщика'),
            new SelectItem(HOLD_EXPIRATION.capture, 'в пользу мерчанта')
        ];
    }

    public isSelected(holdExpiration: string): boolean {
        return this.form.value.holdExpiration === holdExpiration;
    }
}
