import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { HOLD_EXPIRATION } from 'koffing/backend/constants/hold-expiration';
import { CheckoutConfigFormService } from './checkout-config-form.service';
import { PaymentMethod } from 'koffing/backend/model/payment-method/payment-method';

interface ConfigurablePaymentMethodInfo {
    label: string;
    formControlName: string;
}

@Component({
    selector: 'kof-checkout-config-form',
    templateUrl: './checkout-config-form.component.pug',
    styleUrls: ['./checkout-config-form.component.less']
})
export class CheckoutConfigFormComponent implements OnInit, OnChanges {

    @Input()
    public methods: PaymentMethod[];

    public configurableMethods: PaymentMethod[];

    public form: FormGroup;

    public holdExpirationItems: SelectItem[];

    public additionalMethods: boolean = false;

    constructor(private checkoutConfigFormService: CheckoutConfigFormService) {}

    public ngOnInit() {
        this.holdExpirationItems = [
            new SelectItem(HOLD_EXPIRATION.cancel, 'в пользу плательщика'),
            new SelectItem(HOLD_EXPIRATION.capture, 'в пользу мерчанта')
        ];
        this.form = this.checkoutConfigFormService.form;

    }

    public ngOnChanges() {
        if (this.methods) {
            this.configurableMethods = this.methods.filter((method) => method.method !== 'BankCard');
            this.additionalMethods = this.methods.length > 1;
        }
    }

    public isSelected(holdExpiration: string): boolean {
        return this.form.value.holdExpiration === holdExpiration;
    }

    public getInfo(methodName: string): ConfigurablePaymentMethodInfo {
        switch (methodName) {
            case 'PaymentTerminal':
                return {
                    label: 'Терминалы "Евросеть"',
                    formControlName: 'terminals'
                };
            case 'DigitalWallet':
                return {
                    label: 'QIWI кошелек',
                    formControlName: 'wallets'
                };
        }
    }

    public toggleHolds() {
        this.form.patchValue({
            paymentFlowHold: false
        });
    }

}
