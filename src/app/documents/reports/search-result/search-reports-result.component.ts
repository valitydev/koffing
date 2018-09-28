import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { get } from 'lodash';

import { Report } from 'koffing/backend';
import { ReportTableItem } from './report-item';
import { ReportsFilter } from '../reports-filter';

@Component({
    selector: 'kof-search-reports-result',
    templateUrl: 'search-reports-result.component.pug'
})
export class SearchReportsResultComponent implements OnInit {

    @Input()
    public reports$: Observable<Report[]>;

    @Input()
    public filter: ReportsFilter;

    public reportItems: ReportTableItem[];

    public ngOnInit() {
        this.reports$.subscribe((reports) => {
            this.reportItems = reports.map((report) => new ReportTableItem(report, false));
        });
    }

    public toggleFilesPanel(item: ReportTableItem) {
        item.isVisible = !item.isVisible;
    }

    public filtered(reports: ReportTableItem[]): ReportTableItem[] {
        return this.filter && reports
            ? reports.filter((report) => get(report, this.filter.path) === this.filter.value)
            : reports;
    }
}
