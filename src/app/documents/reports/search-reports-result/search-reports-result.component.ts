import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Report } from 'koffing/backend';
import { ReportTableItem } from './report-item';

@Component({
    selector: 'kof-search-reports-result',
    templateUrl: 'search-reports-result.component.pug'
})
export class SearchReportsResultComponent implements OnInit {

    @Input()
    public reports$: Observable<Report[]>;

    public reportItems: ReportTableItem[];

    public ngOnInit() {
        this.reports$.subscribe((reports) => {
            this.reportItems = reports.map((report) => new ReportTableItem(report, false));
        });
    }

    public toggleFilesPanel(item: ReportTableItem) {
        item.isVisible = !item.isVisible;
    }
}
