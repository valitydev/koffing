import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { AccountService } from 'koffing/backend/backend.module';
import { CustomerService } from 'koffing/backend/backend.module';
import { RequestParams } from 'koffing/backend/backend.module';
import { GeoData } from 'koffing/backend/backend.module';
import { PaymentsService } from 'koffing/backend/backend.module';
import { Conversion } from 'koffing/backend/backend.module';

@Component({
    templateUrl: './dashboard.component.pug',
    styleUrls: ['./dashboard.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public fromTime: any;
    public toTime: any;
    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public account: any = {
        general: {
            ownAmount: 1
        },
        guarantee: {
            ownAmount: 2
        }
    };
    public chartFromTime: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoData[] = [];
    public paymentMethodChartData: any;
    public isInfoPanelLoading: boolean;

    private fromTimeDate: Date;
    private toTimeDate: Date;
    private shopID: string;

    constructor(private route: ActivatedRoute,
                private customer: CustomerService,
                private payments: PaymentsService,
                private accounts: AccountService) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.setInitialDate();
            this.loadData();
        });
    }

    private loadRate() {
        return new Promise((resolve) => {
            this.customer.getRate(
                this.shopID,
                new RequestParams(
                    this.fromTime,
                    this.toTime
                )
            ).then(
                (rateStat: any) => {
                    this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
                    resolve();
                }
            );
        });
    }

    private loadPaymentMethod() {
        this.customer.getPaymentMethod(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1',
                'bank_card'
            )
        ).then(
            (paymentMethodState: any) => {
                this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
            }
        );
    }

    private loadConversionStat() {
        return new Promise((resolve) => {
            this.payments.getConversionStat(
                this.shopID,
                new RequestParams(
                    this.fromTime,
                    this.toTime,
                    'minute',
                    '1'
                )
            ).then(
                (conversionStat: Conversion[]) => {
                    let paymentCountInfo: any;

                    paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);

                    this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
                    this.successfulCount = paymentCountInfo.successfulCount;
                    this.unfinishedCount = paymentCountInfo.unfinishedCount;

                    resolve();
                }
            );
        });
    }

    private loadGeoChartData() {
        this.payments.getGeoChartData(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'day',
                '1'
            )
        ).then(
            (geoData: GeoData[]) => {
                this.geoChartData = ChartDataConversionService.toGeoChartData(geoData);
            }
        );
    }

    private loadRevenueStat() {
        return new Promise((resolve) => {
            this.payments.getRevenueStat(
                this.shopID,
                new RequestParams(
                    this.fromTime,
                    this.toTime,
                    'minute',
                    '1'
                )
            ).then(
                (revenueStat: any) => {
                    this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
                    this.profit = ChartDataConversionService.toTotalProfit(revenueStat);

                    resolve();
                }
            );
        });
    }

    private loadShopAccounts() {
        return new Promise((resolve) => {
            this.accounts.getShopAccounts(this.shopID).then(
                (shopAccounts) => {
                    if (shopAccounts.length > 1) {
                        console.warn('shop accounts size > 1');
                    }
                    _.forEach(shopAccounts, item => {
                        this.accounts.getShopAccountDetails(
                            this.shopID,
                            item.generalID
                        ).then(
                            (generalAccount: any) => {
                                this.account.general = generalAccount;
                            }
                        );

                        this.accounts.getShopAccountDetails(
                            this.shopID,
                            item.guaranteeID
                        ).then(
                            (guaranteeAccount: any) => {
                                this.account.guarantee = guaranteeAccount;
                            }
                        );
                    });

                    resolve();
                }
            );
        });
    }

    private loadData() {
        this.fromTime = moment(this.fromTimeDate).format();
        this.toTime = moment(this.toTimeDate).format();

        this.chartFromTime = this.fromTime;

        this.loadPaymentMethod();
        this.loadGeoChartData();

        this.isInfoPanelLoading = true;
        Promise.all([
            this.loadRate(),
            this.loadConversionStat(),
            this.loadRevenueStat(),
            this.loadShopAccounts()
        ]).then(() => {
            this.isInfoPanelLoading = false;
        });
    }

    private setInitialDate() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth( this.fromTimeDate.getMonth() - 1 );
    }
}
