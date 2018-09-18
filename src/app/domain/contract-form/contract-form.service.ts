import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { ContractCreation, InternationalLegalEntity, PaymentInstitution, RussianLegalEntity } from 'koffing/backend';
import { BankAccountFormService } from 'koffing/domain';
import { InternationalContractFormService } from './international-contract-form/international-contract-form.service';
import { RussianContractFormService } from './russian-contract-form/russian-contract-form.service';
import { PaymentInstitutionService } from 'koffing/backend/payment-institution.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { camelCase } from 'lodash';

@Injectable()
export class ContractFormService {

    private paymentInstitutions: PaymentInstitution[];

    constructor(private bankAccountFormService: BankAccountFormService,
                private internationalContractFormService: InternationalContractFormService,
                private russianContractFormService: RussianContractFormService,
                private paymentInstitutionService: PaymentInstitutionService) {
    }

    public initForm(type: string): FormGroup {
        switch (type) {
            case 'resident':
                return this.russianContractFormService.initForm(type);
            case 'nonresident':
                return this.internationalContractFormService.initForm(type);
        }
    }

    public toContractCreation(contractFormData: any, type: string): Observable<ContractCreation> {
        return this.getPaymentInstitutions().map((paymentInstitutions: PaymentInstitution[]) => {
            let contractor;
            switch (type) {
                case 'resident':
                    contractor = new RussianLegalEntity(contractFormData);
                    break;
                case 'nonresident':
                    contractor = new InternationalLegalEntity(contractFormData);
                    break;
            }
            return new ContractCreation(uuid(), contractor, this.getPaymentInstitutionId(paymentInstitutions, type));
        });

    }

    private getPaymentInstitutions(): Observable<PaymentInstitution[]> {
        return Observable.create((observer: Observer<any>) => {
            if (this.paymentInstitutions) {
                observer.next(this.paymentInstitutions);
            } else {
                this.paymentInstitutionService.getPaymentInstitutions().subscribe((institutions) => {
                    this.paymentInstitutions = institutions;
                    observer.next(institutions);
                });
            }
        });
    }

    // TODO fix it
    private getPaymentInstitutionId(institutions: PaymentInstitution[], type: string): number {
        const find = (rus: boolean) => institutions.find((paymentInstitution) =>
            paymentInstitution.realm === 'live' &&
            !!paymentInstitution.residences.find((residence) => rus ? residence === 'RUS' : residence !== 'RUS')).id;
        switch (type) {
            case 'resident':
                return find(true);
            case 'nonresident':
                return find(false);
        }
    }
}
