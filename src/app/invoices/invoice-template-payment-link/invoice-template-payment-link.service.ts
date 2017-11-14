import {
    COST_TYPE,
    TEMPLATE_TYPE,
    LifetimeInterval,
    CostAmountRange,
    InvoiceLine,
    InvoiceLineTaxVAT,
    InvoiceTemplateParams,
    InvoiceTemplateDetails,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
} from 'koffing/backend';
import { CurrencyService } from 'koffing/common/currency.service';

export class InvoiceTemplatePaymentLinkService {

    public static currency: string = 'RUB';

    public static toInvoiceTemplateParams(formValue: any, shopID: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        params.shopID = shopID;
        params.lifetime = this.toLifetimeInterval(formValue.lifetime);
        params.details = this.toDetails(formValue.details, formValue.selectedTemplateType, formValue.selectedCostType);
        if (formValue.description) {
            params.description = formValue.description;
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

    private static toDetails(details: any, templateType: string, costType: string): InvoiceTemplateDetails {
        if (templateType === TEMPLATE_TYPE.singleLine) {
            return this.toSingleLine(details, costType);
        }
        if (templateType === TEMPLATE_TYPE.multiLine) {
            return this.toMultiLine(details);
        }
    }

    private static toSingleLine(details: any, costType: string): InvoiceTemplateSingleLine {
        let cost;
        switch (costType) {
            case COST_TYPE.unlim:
                cost = new InvoiceTemplateLineCostUnlim();
                break;
            case COST_TYPE.fixed:
                const amount = CurrencyService.toMinor(details.cost.amount);
                cost = new InvoiceTemplateLineCostFixed(amount, this.currency);
                break;
            case COST_TYPE.range:
                const lowerBound = CurrencyService.toMinor(details.cost.lowerBound);
                const upperBound = CurrencyService.toMinor(details.cost.upperBound);
                const range = new CostAmountRange(lowerBound, upperBound);
                cost = new InvoiceTemplateLineCostRange(range, this.currency);
                break;
        }
        const singleLine = new InvoiceTemplateSingleLine(details.product, cost);
        if (details.tax) {
            singleLine.taxMode = new InvoiceLineTaxVAT(details.tax);
        }
        return singleLine;
    }

    private static toMultiLine(details: any) {
        const cart = details.cart.map((item: any) => {
            const invoiceLine = new InvoiceLine(item.product, item.quantity, CurrencyService.toMinor(item.price));
            if (item.tax) {
                invoiceLine.taxMode = new InvoiceLineTaxVAT(item.tax);
            }
            return invoiceLine;
        });
        return new InvoiceTemplateMultiLine(cart, this.currency);
    }
}
