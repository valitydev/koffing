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

    public additionalMethodConfigs: ConfigurablePaymentMethodInfo[];

    public form: FormGroup;

    public holdExpirationItems: SelectItem[];

    constructor(private checkoutConfigFormService: CheckoutConfigFormService) {}

    public ngOnInit() {
        this.form = this.checkoutConfigFormService.form;
        this.holdExpirationItems = [
            new SelectItem(HOLD_EXPIRATION.cancel, 'в пользу плательщика'),
            new SelectItem(HOLD_EXPIRATION.capture, 'в пользу мерчанта')
        ];

    }

    public ngOnChanges() {
        if (this.methods) {
            this.additionalMethodConfigs = this.getAdditionalMethodsConfig(this.methods);
            this.form.patchValue(this.toFormAdditionalMethodsValue(this.additionalMethodConfigs));
        }
    }

    public isSelected(holdExpiration: string): boolean {
        return this.form.value.holdExpiration === holdExpiration;
    }

    public toggleHolds() {
        this.form.patchValue({
            paymentFlowHold: false
        });
    }

    private toFormAdditionalMethodsValue(config: ConfigurablePaymentMethodInfo[]): object {
        return config.reduce((acc, current) => ({...acc, [current.formControlName]: true}), {});
    }

    private getAdditionalMethodsConfig(methods: PaymentMethod[]): ConfigurablePaymentMethodInfo[] {
        const additionalMethods = methods.filter((method) => method.method !== 'BankCard');
        return additionalMethods.map((item) => {
            switch (item.method) {
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
                default:
                    throw new Error('Unhandled PaymentMethod');
            }
        });
    }
}
