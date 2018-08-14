import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { CheckoutConfigFormService } from './checkout-config-form.service';
import { PaymentMethod, HOLD_EXPIRATION } from 'koffing/backend';
import { PaymentMethodInfo, ManagePaymentMethodsService } from './manage-payment-methods.service';

@Component({
    selector: 'kof-checkout-config-form',
    templateUrl: './checkout-config-form.component.pug',
    styleUrls: ['./checkout-config-form.component.less'],
    providers: [ManagePaymentMethodsService]
})
export class CheckoutConfigFormComponent implements OnInit, OnChanges {

    @Input()
    public methods: PaymentMethod[];

    public additionalMethodConfigs: PaymentMethodInfo[];

    public form: FormGroup;

    public holdExpirationItems: SelectItem[];

    public isHoldAvailable: boolean = true;

    constructor(private checkoutConfigFormService: CheckoutConfigFormService,
                private managePaymentMethodsService: ManagePaymentMethodsService) {
    }

    public ngOnInit() {
        this.form = this.checkoutConfigFormService.form;
        this.form.valueChanges.subscribe(() => this.handleHoldAvailable());
        this.holdExpirationItems = [
            new SelectItem(HOLD_EXPIRATION.cancel, 'в пользу плательщика'),
            new SelectItem(HOLD_EXPIRATION.capture, 'в пользу мерчанта')
        ];
        this.updateMethods();
    }

    public ngOnChanges() {
        this.updateMethods();
    }

    public isSelected(holdExpiration: string): boolean {
        return this.form.value.holdExpiration === holdExpiration;
    }

    public toggleHolds() {
        this.form.patchValue({
            paymentFlowHold: false
        });
    }

    private updateMethods() {
        if (this.form && this.methods) {
            this.additionalMethodConfigs = this.managePaymentMethodsService.getAdditionalMethodsConfig(this.methods);
            this.managePaymentMethodsService.handleAdditionalMethods(this.additionalMethodConfigs, this.form);
        }
    }

    private handleHoldAvailable() {
        const { bankCard, terminals, wallets, applePay, googlePay, samsungPay } = this.form.getRawValue();
        this.isHoldAvailable = (bankCard || applePay || googlePay || samsungPay) && !(terminals || wallets);
    }
}
