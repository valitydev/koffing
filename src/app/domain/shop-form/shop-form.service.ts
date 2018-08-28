import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';
import { isURL } from 'validator';

import { ShopCreation, ShopDetails, ShopLocationUrl } from 'koffing/backend';

@Injectable()
export class ShopFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            url: ['', [
                Validators.required,
                (c: AbstractControl) => isURL(c.value, {protocols: ['http', 'https'], require_protocol: true}) ? null : {isURL: true}
            ]],
            name: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [
                Validators.maxLength(1000)
            ]]
        });
    }

    public toShopCreation(contractID: string, payoutToolID: string, shopForm: FormGroup): ShopCreation {
        const shop = shopForm.value;
        return new ShopCreation({
            shopID: uuid(),
            location: new ShopLocationUrl(shop.url),
            details: new ShopDetails(shop.name, shop.description),
            contractID,
            payoutToolID
        });
    }
}
