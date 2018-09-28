import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { Report, ReportType, SearchReportParams } from 'koffing/backend';
import { DateRange } from 'koffing/common/date-range/date-range';
import { SearchService } from 'koffing/backend/search.service';
import { ReportsFilter } from './reports-filter';

@Component({
    selector: 'kof-provision-of-service',
    templateUrl: 'reports.component.pug',
    styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

    public reports$: Subject<Report[]> = new Subject();
    public filter: ReportsFilter;

    private shopID: string;
    private dateRange: Subject<DateRange> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService
    ) {
    }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.filter = {
                path: 'report.type',
                value: params['type']
            };
        });
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.dateRange.subscribe((dateRange) => this.getReports(dateRange));
    }

    public selectDateRange(dateRange: DateRange) {
        this.dateRange.next(dateRange);
    }

    private getReports(dateRange: DateRange) {
        const params = new SearchReportParams(dateRange.fromTime, dateRange.toTime);
        this.searchService.getReports(this.shopID, params).subscribe((reports) => {
            this.reports$.next(reports);
        });
    }
}
