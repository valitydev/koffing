import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Report, SearchReportParams } from 'koffing/backend';
import { SearchService } from 'koffing/backend/search.service';
import { DateRange } from 'koffing/common/date-range/date-range';

@Component({
    templateUrl: 'reports.component.pug',
    styleUrls: ['reports.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {

    public reports$: Subject<Report[]> = new Subject();
    private shopID: string;

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService
    ) { }

    public ngOnInit() {
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }

    public selectDateRange(dateRange: DateRange) {
        const params = new SearchReportParams(dateRange.fromTime, dateRange.toTime);
        this.searchService.getReports(this.shopID, params).subscribe((reports) => {
            this.reports$.next(reports);
        });
    }
}
