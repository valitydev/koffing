import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { ShopService }  from 'koffing/backend/services/shop.service';
import { AccountsService } from 'koffing/backend/accounts.service';
import { DateRange } from '../date-range-selector/date-range.class';
import { PanelData } from '../statistic-panel/panel-data';
import { DashboardService } from './dashboard.service';
import { LineChartData } from './stats-data/line-chart-data';
import { DoughnutChartData } from './stats-data/doughnut-chart-data';

@Component({
    templateUrl: './dashboard.component.pug',
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    public shopID: number;
    public fromTime: Date = moment().subtract(1, 'month').startOf('day').toDate();
    public toTime: Date = moment().endOf('day').toDate();
    public profit: number = 0;

    public panelData: Subject<PanelData> = new Subject();
    public revenueChartData: Subject<LineChartData> = new Subject();
    public conversionChartData: Subject<LineChartData> = new Subject();
    public geoChartData: Subject<DoughnutChartData> = new Subject();
    public paymentMethodChartData: Subject<DoughnutChartData> = new Subject();

    public isLoading: boolean = true;
    public loadStatistic: Subject<null> = new Subject();
    private requestCount = 5;

    constructor(private route: ActivatedRoute,
                private accountsService: AccountsService,
                private shopService: ShopService,
                private dashboardService: DashboardService) {
    }

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = Number(params['shopID']);
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

    private loadPaymentMethod(shopID: number, fromTime: Date, toTime: Date) {
        this.dashboardService.getPaymentMethodChartData(shopID, fromTime, toTime).subscribe((data) => {
            this.paymentMethodChartData.next(data);
            this.loadStatistic.next();
        });
    }

    private loadRate(shopID: number, from: Date, to: Date) {
        this.dashboardService.getUniqueCount(shopID, from, to).subscribe((count) => {
            this.panelData.next({uniqueCount: count});
            this.loadStatistic.next();
        });
    }

    private loadConversionStat(shopID: number, from: Date, to: Date) {
        this.dashboardService.getPaymentConversionData(shopID, from, to).subscribe((data) => {
            this.panelData.next({
                successfulCount: data.paymentCount.successfulCount,
                unfinishedCount: data.paymentCount.unfinishedCount
            });
            this.conversionChartData.next(data.conversionChartData);
            this.loadStatistic.next();
        });
    }

    private loadGeoChartData(shopID: number, from: Date, to: Date) {
        this.dashboardService.getPaymentGeoChartData(shopID, from, to).subscribe((data) => {
            this.geoChartData.next(data);
            this.loadStatistic.next();
        });
    }

    private loadRevenueStat(shopID: number, from: Date, to: Date) {
        this.dashboardService.getPaymentRevenueData(shopID, from, to).subscribe((data) => {
            this.profit = data.profit;
            this.revenueChartData.next(data.revenueChartData);
            this.loadStatistic.next();
        });
    }

    private loadAccounts(shopID: number) {
        this.shopService.getShop(shopID).then((shop) => {
            this.accountsService.getAccountByID(shop.account.settlementID).subscribe((account) => {
                this.panelData.next({settlementBalance: account.ownAmount});
                this.loadStatistic.next();
            });
        });
    }
}
