import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import { toString } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { PaymentMethodStat } from './model/payment-method-stat';
import { PaymentRateStat } from './model/payment-rate-stat';
import { PaymentGeoStat } from './model/payment-geo-stat';
import { PaymentConversionStat } from './model/payment-conversion-stat';
import { PaymentRevenueStat } from './model/payment-revenue-stat';

@Injectable()
export class AnalyticsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getPaymentMethodStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number, paymentMethod?: string): Observable<PaymentMethodStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(from));
        params.set('toTime', this.toUTC(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        params.set('paymentMethod', paymentMethod || 'bankCard');
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/payment_method`, {search: params})
            .map((res) => res.json());
    }

    public getPaymentRateStats(shopID: number, from: Date, to: Date): Observable<PaymentRateStat> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(from));
        params.set('toTime', this.toUTC(to));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/rate`, {search: params})
            .map((res) => res.json());
    }

    public getPaymentConversionStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentConversionStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(from));
        params.set('toTime', this.toUTC(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/conversion`, {search: params})
            .map((res) => res.json());
    }

    public getPaymentGeoStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentGeoStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(from));
        params.set('toTime', this.toUTC(to));
        params.set('splitUnit', splitUnit || 'day');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`, {search: params})
            .map((res) => res.json());
    }

    public getPaymentRevenueStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentRevenueStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(from));
        params.set('toTime', this.toUTC(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`, {search: params})
            .map(res => res.json());
    }

    private toUTC(date: Date): string {
        return moment(date).utc().format();
    }

    private getSplitSize(splitSize: number) {
        return splitSize ? toString(splitSize) : '1';
    }
}
