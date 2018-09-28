import { Report } from 'src/app/backend/index';

export class ReportTableItem {

    public report: Report;
    public isVisible: boolean;

    constructor(report: Report, isVisible: boolean) {
        this.report = report;
        this.isVisible = isVisible;
    }
}
