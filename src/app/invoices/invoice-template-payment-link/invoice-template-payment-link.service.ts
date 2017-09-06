import {
    LifetimeInterval,
    InvoiceTemplateCostFixed,
    InvoiceTemplateCostRange,
    InvoiceTemplateCostUnlim,
    CostAmountRange
} from 'koffing/backend';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import { CurrencyService } from 'koffing/common/currency.service';
import { COST_TYPE } from 'koffing/backend/constants/invoice-template-cost-type';

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
            const currency = 'RUB';
            if (formValue.selectedCostType === COST_TYPE.unlim) {
                cost = new InvoiceTemplateCostUnlim();
            } else if (formValue.selectedCostType === COST_TYPE.fixed) {
                const amount = CurrencyService.toMinor(formValue.cost.amount);
                cost = new InvoiceTemplateCostFixed(amount, currency);
            } else if (formValue.selectedCostType === COST_TYPE.range) {
                const lowerBound = CurrencyService.toMinor(formValue.cost.lowerBound);
                const upperBound = CurrencyService.toMinor(formValue.cost.upperBound);
                const range = new CostAmountRange(lowerBound, upperBound);
                cost = new InvoiceTemplateCostRange(range, currency);
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
}
