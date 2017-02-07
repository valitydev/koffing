import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { ShopService }  from 'koffing/backend/services/shop.service';
import { AccountService } from 'koffing/backend/backend.module';
import { CustomerService } from 'koffing/backend/backend.module';
import { PaymentsService } from 'koffing/backend/backend.module';
import { RequestParams } from 'koffing/backend/backend.module';
import { PaymentGeoStat } from 'koffing/backend/backend.module';
import { Conversion } from 'koffing/backend/backend.module';
import { GeolocationService } from 'koffing/backend/backend.module';
import { LocationName } from 'koffing/backend/backend.module';
import { GeoChartLabeled } from './geo-chart-labeled.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { GeoChartData } from './geo-chart-data.class';

@Component({
    templateUrl: './dashboard.component.pug',
    styleUrls: ['./dashboard.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public fromTime: any;
    public toTime: any;
    public fromTimeDate: Date;
    public toTimeDate: Date;
    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public guaranteeBalance: any;
    public settlementBalance: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoChartLabeled;
    public paymentMethodChartData: any;

    private shopID: number;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private paymentsService: PaymentsService,
        private accountService: AccountService,
        private shopService: ShopService,
        private geolocation: GeolocationService
    ) {}

    public ngOnInit() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth(this.fromTimeDate.getMonth() - 1);

        this.toTime = moment(this.toTimeDate).format();
        this.fromTime = moment(this.fromTimeDate).format();

        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = Number(params['shopID']);
            this.loadData();
        });
    }

    private loadData() {
        this.loadPaymentMethod();
        this.loadGeoChartData();
        this.loadRate();
        this.loadConversionStat();
        this.loadRevenueStat();
        this.loadAccounts();
    }

    private loadPaymentMethod() {
        this.customerService.getPaymentMethod(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1', 'bankCard')
        ).then((paymentMethodState: any) => {
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }

    private loadRate() {
        this.customerService.getRate(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime)
        ).then((rateStat: any) => {
            this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
        });
    }

    private loadConversionStat() {
        this.paymentsService.getConversionStat(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((conversionStat: Conversion[]) => {
            const paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
            this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
        });
    }

    private loadGeoChartData() {
        this.geolocation.getGeoChartData(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'day', '1')
        ).then((geoData: PaymentGeoStat[]) => {
            const unlabeledGeoChartData: GeoChartData = ChartDataConversionService.toGeoChartData(geoData);

            if (unlabeledGeoChartData.geoIDs.length > 0 && unlabeledGeoChartData.data.length > 0) {
                this.geolocation.getLocationNames(unlabeledGeoChartData.geoIDs, 'ru').then(
                    (locationNames: LocationName[]) => {
                        this.geoChartData = ChartDataConversionService.toLabeledGeoChartData(unlabeledGeoChartData, locationNames);
                    }
                );
            } else {
                this.geoChartData = new GeoChartLabeled([], []);
            }
        });
    }

    private loadRevenueStat() {
        this.paymentsService.getRevenueStat(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((revenueStat: any) => {
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
        });
    }

    private loadAccounts() {
        this.shopService.getShop(this.shopID).then((shop: Shop) => {
            this.accountService.getAccount(shop.account.guaranteeID).then((account: any) => {
                this.guaranteeBalance = account.ownAmount;
            });
            this.accountService.getAccount(shop.account.settlementID).then((account: any) => {
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}
