import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contract } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent {

    @Input()
    public newContract: Contract;

    @Output()
    public readyStateChange = new EventEmitter();

    private isOnceValid: boolean = false;

    public checkForm(form: any) {
        let emit = () => {
            this.readyStateChange.emit({
                contract: this.newContract,
                valid: form.valid
            });
        };

        if (form.valid) {
            emit();
            this.isOnceValid = true;
        } else if (!form.valid && this.isOnceValid) {
            emit();
            this.isOnceValid = false;
        }
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }
}
