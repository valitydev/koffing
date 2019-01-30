import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { ShopService } from 'koffing/backend/shop.service';
import { AccountsService } from 'koffing/backend/accounts.service';
import { LineChartData } from './stats-data/line-chart-data';
import { DoughnutChartData } from './stats-data/doughnut-chart-data';
import { DateRange } from 'koffing/common/date-range-selector/date-range';
import { PanelData } from 'koffing/analytics/statistic-panel/panel-data';
import { AnalyticsService } from 'koffing/analytics/analytics.service';

@Component({
    templateUrl: 'analytics.component.pug',
    providers: [AnalyticsService]
})
export class AnalyticsComponent implements OnInit {
    public shopID: string;
    public fromTime: Date = moment()
        .subtract(1, 'day')
        .startOf('day')
        .toDate();
    public toTime: Date = moment()
        .endOf('day')
        .toDate();
    public profit: number = 0;

    public panelData: Subject<PanelData> = new Subject();
    public revenueChartData: Subject<LineChartData> = new Subject();
    public conversionChartData: Subject<LineChartData> = new Subject();
    public geoChartData: Subject<DoughnutChartData> = new Subject();
    public paymentMethodChartData: Subject<DoughnutChartData> = new Subject();

    public isLoading: boolean = true;
    public loadStatistic: Subject<null> = new Subject();
    private requestCount = 5;

    constructor(
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private shopService: ShopService,
        private analyticsService: AnalyticsService
    ) {}

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.loadData(new DateRange(this.fromTime, this.toTime));
        });
    }

    public loadData(dateRange: DateRange) {
        const shopID = this.shopID;
        this.loadPaymentMethod(shopID, dateRange.from, dateRange.to);
        this.loadRate(shopID, dateRange.from, dateRange.to);
        this.loadConversionStat(shopID, dateRange.from, dateRange.to);
        this.loadGeoChartData(shopID, dateRange.from, dateRange.to);
        this.loadRevenueStat(shopID, dateRange.from, dateRange.to);
        this.loadAccounts(shopID);

        this.isLoading = true;
        const loadSubscription = this.loadStatistic.skip(this.requestCount).subscribe(() => {
            this.isLoading = false;
            loadSubscription.unsubscribe();
        });
    }

    private loadPaymentMethod(shopID: string, fromTime: Date, toTime: Date) {
        this.analyticsService
            .getPaymentMethodChartData(shopID, fromTime, toTime)
            .subscribe(data => {
                this.paymentMethodChartData.next(data);
                this.loadStatistic.next();
            });
    }

    private loadRate(shopID: string, from: Date, to: Date) {
        this.analyticsService.getUniqueCount(shopID, from, to).subscribe(count => {
            this.panelData.next({ uniqueCount: count });
            this.loadStatistic.next();
        });
    }

    private loadConversionStat(shopID: string, from: Date, to: Date) {
        this.analyticsService.getPaymentConversionData(shopID, from, to).subscribe(data => {
            this.panelData.next({
                successfulCount: data.paymentCount.successfulCount,
                unfinishedCount: data.paymentCount.unfinishedCount
            });
            this.conversionChartData.next(data.conversionChartData);
            this.loadStatistic.next();
        });
    }

    private loadGeoChartData(shopID: string, from: Date, to: Date) {
        this.analyticsService.getPaymentGeoChartData(shopID, from, to).subscribe(data => {
            this.geoChartData.next(data);
            this.loadStatistic.next();
        });
    }

    private loadRevenueStat(shopID: string, from: Date, to: Date) {
        this.analyticsService.getPaymentRevenueData(shopID, from, to).subscribe(data => {
            this.profit = data.profit;
            this.revenueChartData.next(data.revenueChartData);
            this.loadStatistic.next();
        });
    }

    private loadAccounts(shopID: string) {
        this.shopService.getShopByID(shopID).subscribe(shop => {
            this.accountsService.getAccountByID(shop.account.settlementID).subscribe(account => {
                this.panelData.next({ settlementBalance: account.ownAmount });
                this.loadStatistic.next();
            });
        });
    }
}
