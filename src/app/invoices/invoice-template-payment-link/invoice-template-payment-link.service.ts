import { round } from 'lodash';

import {
    LifetimeInterval,
    InvoiceTemplateCostFixed,
    InvoiceTemplateCostRange,
    InvoiceTemplateCostUnlim,
    CostAmountRange
} from 'koffing/backend';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import { COST_TYPES } from '../invoice-template-form/invoice-template-cost-types';

export class InvoiceTemplatePaymentLinkService {

    public static toInvoiceTemplateParams(formValue: any, shopID: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        params.shopID = shopID;
        params.product = formValue.product;
        if (formValue.description) {
            params.description = formValue.description;
        }
        params.lifetime = this.toLifetimeInterval(formValue.lifetime);
        if (formValue.selectedCostType) {
            let cost;
            if (formValue.selectedCostType === COST_TYPES.unlim) {
                cost = new InvoiceTemplateCostUnlim();
            } else if (formValue.selectedCostType === COST_TYPES.fixed) {
                cost = new InvoiceTemplateCostFixed(this.toMinor(formValue.cost.amount));
            } else if (formValue.selectedCostType === COST_TYPES.range) {
                const lowerBound = this.toMinor(formValue.cost.lowerBound);
                const upperBound = this.toMinor(formValue.cost.upperBound);
                const range = new CostAmountRange(lowerBound, upperBound);
                cost = new InvoiceTemplateCostRange(range);
            }
            params.cost = cost;
        }
        return params;
    }

    private static toLifetimeInterval(formLifetime: any): LifetimeInterval {
        return new LifetimeInterval(
            formLifetime.days || 0,
            formLifetime.months || 0,
            formLifetime.years || 0
        );
    }

    private static toMinor(value: number): number {
        return round(value * 100);
    }
}
