import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { PaymentMethod, PaymentMethodBankCard } from 'koffing/backend/model';

export interface PaymentMethodInfo {
    label: string;
    formControlName: string;
}

interface FormControls {
    [key: string]: AbstractControl;
}

@Injectable()
export class ManagePaymentMethodsService {

    public getAdditionalMethodsConfig(methods: PaymentMethod[]): PaymentMethodInfo[] {
        return methods.filter((item) => {
            if (item.method === 'BankCard') {
                const bankCard = item as PaymentMethodBankCard;
                return !bankCard.tokenProviders;
            }
            return true;
        }).map((item) => {
            switch (item.method) {
                case 'BankCard':
                    return {
                        label: 'Банковская карта',
                        formControlName: 'bankCard',
                        order: 1
                    };
                case 'DigitalWallet':
                    return {
                        label: 'QIWI кошелек',
                        formControlName: 'wallets',
                        order: 2
                    };
                case 'PaymentTerminal':
                    return {
                        label: 'Терминалы "Евросеть"',
                        formControlName: 'terminals',
                        order: 3
                    };
                default:
                    throw new Error('Unhandled PaymentMethod');
            }
        }).sort((item) => item.order);
    }

    public handleAdditionalMethods(info: PaymentMethodInfo[], form: FormGroup) {
        const controlsMap = this.infoToControlMap(info, form.controls);
        form.valueChanges.subscribe((values) => {
            const activityMap = this.infoToActivityMap(info, values);
            this.disable(activityMap, controlsMap);
        });
        controlsMap.forEach((value, key) => {
            const enableCandidates = this.excludeInitiator(key, controlsMap);
            value.valueChanges.subscribe(this.enable.bind(this, enableCandidates));
        });
    }

    private infoToControlMap(info: PaymentMethodInfo[], controls: FormControls): Map<string, AbstractControl> {
        const result = new Map<string, AbstractControl>();
        info.forEach((item) => {
            result.set(item.formControlName, controls[item.formControlName]);
        });
        return result;
    }

    private infoToActivityMap(info: PaymentMethodInfo[], formValues: any): Map<string, boolean> {
        const result = new Map<string, boolean>();
        info.forEach((item) => {
            result.set(item.formControlName, formValues[item.formControlName]);
        });
        return result;
    }

    private disable(activity: Map<string, boolean>, controls: Map<string, AbstractControl>) {
        let activeControlName: string;
        let hasActive: boolean = false;
        let isSingleEnabled: boolean = false;
        activity.forEach((active, controlName) => {
            if (!hasActive && active) {
                activeControlName = controlName;
                hasActive = true;
                isSingleEnabled = true;
            } else if (hasActive && active) {
                isSingleEnabled = false;
            }
        });
        if (activeControlName && isSingleEnabled) {
            const control = controls.get(activeControlName);
            if (control.enabled) {
                control.disable();
            }
        }
    }

    private excludeInitiator(initiatorControlName: string, controls: Map<string, AbstractControl>): AbstractControl[] {
        const result: AbstractControl[] = [];
        controls.forEach((value, key) => {
            if (key !== initiatorControlName) {
                result.push(value);
            }
        });
        return result;
    }

    private enable(controls: AbstractControl[], value: boolean) {
        if (value) {
            controls.forEach((control) => control.disabled && control.enable());
        }
    }
}
