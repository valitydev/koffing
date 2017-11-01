import { Pipe, PipeTransform } from '@angular/core';

import { REPORT_TYPE } from 'koffing/backend';

@Pipe({
    name: 'kofReportType'
})
export class ReportTypePipe implements PipeTransform {

    public transform(reportType: string): string {
        switch (reportType) {
            case REPORT_TYPE.paymentRegistry:
                return 'Реестр платежей';
            case REPORT_TYPE.provisionOfService:
                return 'Акт об оказании услуг';
            default:
                return reportType;
        }
    }
}
