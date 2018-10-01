import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { Report, ReportType, SearchReportParams } from 'koffing/backend';
import { DateRange } from 'koffing/common/date-range/date-range';
import { SearchService } from 'koffing/backend/search.service';
import { ReportsFilter } from './reports-filter';
import { ReportsService } from 'koffing/backend/reports.service';

@Component({
    selector: 'kof-provision-of-service',
    templateUrl: 'reports.component.pug',
    styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

    public reports$: Subject<Report[]> = new Subject();
    public filter: ReportsFilter;
    public isLoading = false;
    public reportTypes = ReportType;
    public reportType: ReportType;

    private shopID: string;
    private dateRange: BehaviorSubject<DateRange> = new BehaviorSubject(null);

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService,
        private reportsService: ReportsService
    ) {
    }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.reportType = params['type'];
            this.filter = {
                path: 'report.type',
                value: params['type']
            };
        });
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.dateRange.subscribe((dateRange) => dateRange ? this.getReports(dateRange) : null);
    }

    public selectDateRange(dateRange: DateRange) {
        this.dateRange.next(dateRange);
    }

    public createReports() {
        this.isLoading = true;
        this.reportsService.createReport(this.shopID, {...this.dateRange.getValue(), reportType: this.reportType})
            .subscribe(() => {
                this.isLoading = false;
                this.getReports(this.dateRange.getValue());
            }, (e) => this.failed(e));
    }

    private getReports(dateRange: DateRange) {
        const params = new SearchReportParams(dateRange.fromTime, dateRange.toTime);
        this.isLoading = true;
        this.searchService.getReports(this.shopID, params).subscribe((reports) => {
            this.isLoading = false;
            this.reports$.next(reports);
        }, (e) => this.failed(e));
    }

    private failed(e: any) {
        console.error(e);
        this.isLoading = false;
    }
}
