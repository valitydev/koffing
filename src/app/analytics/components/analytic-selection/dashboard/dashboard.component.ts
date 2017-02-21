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

    public shopID: number;
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
    public revenueLoading: boolean;
    public conversionLoading: boolean;
    public paymentMethodLoading: boolean;
    public geoLoading: boolean;
    public rateLoading: boolean;
    public guaranteeLoading: boolean;
    public settlementLoading: boolean;

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
            this.rateLoading = true;
            this.revenueLoading = true;
            this.conversionLoading = true;
            this.paymentMethodLoading = true;
            this.geoLoading = true;
            this.guaranteeLoading = true;
            this.settlementLoading = true;
            this.shopID = Number(params['shopID']);
            this.loadData();
        });
    }

    private loadData() {
        this.loadPaymentMethod(this.shopID);
        this.loadGeoChartData(this.shopID);
        this.loadRate(this.shopID);
        this.loadConversionStat(this.shopID);
        this.loadRevenueStat(this.shopID);
        this.loadAccounts(this.shopID);
    }

    private loadPaymentMethod(shopID: number) {
        this.customerService.getPaymentMethod(
            shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1', 'bankCard')
        ).then((paymentMethodState: any) => {
            this.paymentMethodLoading = false;
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }

    private loadRate(shopID: number) {
        this.customerService.getRate(
            shopID,
            new RequestParams(this.fromTime, this.toTime)
        ).then((rateStat: any) => {
            this.rateLoading = false;
            this.uniqueCount = rateStat ? rateStat.uniqueCount : 0;
        });
    }

    private loadConversionStat(shopID: number) {
        this.paymentsService.getConversionStat(
            shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((conversionStat: Conversion[]) => {
            this.conversionLoading = false;
            const paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
            this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
        });
    }

    private loadGeoChartData(shopID: number) {
        this.geolocation.getGeoChartData(
            shopID,
            new RequestParams(this.fromTime, this.toTime, 'day', '1')
        ).then((geoData: PaymentGeoStat[]) => {
            this.geoLoading = false;
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

    private loadRevenueStat(shopID: number) {
        this.paymentsService.getRevenueStat(
            shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((revenueStat: any) => {
            this.revenueLoading = false;
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
        });
    }

    private loadAccounts(shopID: number) {
        this.shopService.getShop(shopID).then((shop: Shop) => {
            this.accountService.getAccount(shop.account.guaranteeID).then((account: any) => {
                this.guaranteeLoading = false;
                this.guaranteeBalance = account.ownAmount;
            });
            this.accountService.getAccount(shop.account.settlementID).then((account: any) => {
                this.settlementLoading = false;
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}
