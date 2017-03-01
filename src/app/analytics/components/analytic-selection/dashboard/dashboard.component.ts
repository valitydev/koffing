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
    public isInvalidDate = false;

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

        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = Number(params['shopID']);
            this.loadData();
        });
    }

    private loadData() {
        if (this.fromTimeDate.getTime() >= this.toTimeDate.getTime()) {
            this.isInvalidDate = true;
            return false;
        }
        this.isInvalidDate = false;

        const shopID = this.shopID;
        const fromTime = moment(this.fromTimeDate).format();
        const toTime = moment(this.toTimeDate).format();

        this.loadPaymentMethod(shopID, fromTime, toTime);
        this.loadGeoChartData(shopID, fromTime, toTime);
        this.loadRate(shopID, fromTime, toTime);
        this.loadConversionStat(shopID, fromTime, toTime);
        this.loadRevenueStat(shopID, fromTime, toTime);
        this.loadAccounts(shopID);
    }

    private loadPaymentMethod(shopID: number, fromTime: string, toTime: string) {
        this.paymentMethodLoading = true;
        this.customerService.getPaymentMethod(shopID, new RequestParams(fromTime, toTime)).then((paymentMethodState: any) => {
            this.paymentMethodLoading = false;
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }

    private loadRate(shopID: number, fromTime: string, toTime: string) {
        this.rateLoading = true;
        this.customerService.getRate(shopID, new RequestParams(fromTime, toTime)).then((rateStat: any) => {
            this.rateLoading = false;
            this.uniqueCount = rateStat ? rateStat.uniqueCount : 0;
        });
    }

    private loadConversionStat(shopID: number, fromTime: string, toTime: string) {
        this.conversionLoading = true;
        this.paymentsService.getConversionStat(shopID, new RequestParams(fromTime, toTime)).then((conversion: Conversion[]) => {
            this.conversionLoading = false;
            const paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversion);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
            this.conversionChartData = ChartDataConversionService.toConversionChartData(conversion);
        });
    }

    private loadGeoChartData(shopID: number, fromTime: string, toTime: string) {
        this.geoLoading = true;
        this.geolocation.getGeoChartData(shopID, new RequestParams(fromTime, toTime, 'day')
        ).then((geoData: PaymentGeoStat[]) => {
            this.geoLoading = false;
            const unlabeledGeoChartData: GeoChartData = ChartDataConversionService.toGeoChartData(geoData);
            if (unlabeledGeoChartData.geoIDs.length > 0 && unlabeledGeoChartData.data.length > 0) {
                this.geolocation.getLocationNames(unlabeledGeoChartData.geoIDs, 'ru').then((locationNames: LocationName[]) => {
                    this.geoChartData = ChartDataConversionService.toLabeledGeoChartData(unlabeledGeoChartData, locationNames);
                });
            } else {
                this.geoChartData = new GeoChartLabeled([], []);
            }
        });
    }

    private loadRevenueStat(shopID: number, fromTime: string, toTime: string) {
        this.revenueLoading = true;
        this.paymentsService.getRevenueStat(shopID, new RequestParams(fromTime, toTime)).then((revenueStat: any) => {
            this.revenueLoading = false;
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
        });
    }

    private loadAccounts(shopID: number) {
        this.shopService.getShop(shopID).then((shop: Shop) => {
            this.guaranteeLoading = true;
            this.accountService.getAccount(shop.account.guaranteeID).then((account: any) => {
                this.guaranteeLoading = false;
                this.guaranteeBalance = account.ownAmount;
            });
            this.settlementLoading = true;
            this.accountService.getAccount(shop.account.settlementID).then((account: any) => {
                this.settlementLoading = false;
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}
