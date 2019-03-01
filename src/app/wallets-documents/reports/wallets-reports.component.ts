import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { Report, ReportType } from 'koffing/backend/wapi/model/report';
import { DateRange } from 'koffing/common/date-range/date-range';
import { ReportsFilter } from './wallets-reports-filter';
import { ReportsService } from 'koffing/backend/wapi/reports.service';

@Component({
    selector: 'kof-wallets-reports',
    templateUrl: 'wallets-reports.component.pug',
    styleUrls: ['./wallets-reports.component.less']
})
export class WalletsReportsComponent implements OnInit {
    public reports$: Subject<Report[]> = new Subject();
    public filter: ReportsFilter;
    public isLoading = false;
    public reportTypes = ReportType;
    public reportType: ReportType;

    private dateRange: BehaviorSubject<DateRange> = new BehaviorSubject(null);
    private form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private reportsService: ReportsService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({ identityID: [''] });
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.reportType = params['type'];
            this.filter = {
                path: 'report.type',
                value: params['type']
            };
        });
    }

    public selectDateRange(dateRange: DateRange) {
        this.dateRange.next(dateRange);
    }

    public createReports() {
        this.isLoading = true;
        this.reportsService
            .createReport(
                { identityID: this.form.value.identityID },
                {
                    ...this.dateRange.getValue(),
                    reportType: this.reportType
                }
            )
            .subscribe(
                () => {
                    this.isLoading = false;
                    this.getReports();
                },
                e => this.failed(e)
            );
    }

    private getReports() {
        const identityID = this.form.value.identityID;
        const dateRange = this.dateRange.getValue();
        this.reports$.next([]);
        if (identityID && dateRange && dateRange.fromTime && dateRange.toTime) {
            this.isLoading = true;
            const { fromTime, toTime } = dateRange;
            this.reportsService
                .getReports({ identityID }, { fromTime, toTime, type: this.reportType })
                .subscribe(
                    reports => {
                        this.isLoading = false;
                        this.reports$.next(reports);
                    },
                    e => this.failed(e)
                );
        }
    }

    private failed(e: any) {
        console.error(e);
        this.isLoading = false;
    }
}
