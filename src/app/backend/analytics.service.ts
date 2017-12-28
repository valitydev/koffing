import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import { toString } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import {
    PaymentMethodStat,
    PaymentRateStat,
    PaymentGeoStat,
    PaymentConversionStat,
    PaymentRevenueStat
} from './model';

@Injectable()
export class AnalyticsService {

    constructor(private http: KoffingHttp,
                private config: ConfigService) {
    }

    public getPaymentMethodStats(shopID: string, from: Date, to: Date, splitUnit?: string, splitSize?: number, paymentMethod?: string): Observable<PaymentMethodStat[]> {
        const search = new URLSearchParams();
        search.set('fromTime', this.toUTC(from));
        search.set('toTime', this.toUTC(to));
        search.set('splitUnit', splitUnit || 'minute');
        search.set('splitSize', this.getSplitSize(splitSize));
        search.set('paymentMethod', paymentMethod || 'bankCard');
        return this.http.get(`${this.getEndpoint(shopID, 'customers')}/payment_method`, {search})
            .map((res) => res.json());
    }

    public getPaymentRateStats(shopID: string, from: Date, to: Date): Observable<PaymentRateStat> {
        const search = new URLSearchParams();
        search.set('fromTime', this.toUTC(from));
        search.set('toTime', this.toUTC(to));
        return this.http.get(`${this.getEndpoint(shopID, 'customers')}/rate`, {search})
            .map((res) => res.json());
    }

    public getPaymentConversionStats(shopID: string, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentConversionStat[]> {
        const search = new URLSearchParams();
        search.set('fromTime', this.toUTC(from));
        search.set('toTime', this.toUTC(to));
        search.set('splitUnit', splitUnit || 'minute');
        search.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.getEndpoint(shopID, 'payments')}/conversion`, {search})
            .map((res) => res.json());
    }

    public getPaymentGeoStats(shopID: string, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentGeoStat[]> {
        const search = new URLSearchParams();
        search.set('fromTime', this.toUTC(from));
        search.set('toTime', this.toUTC(to));
        search.set('splitUnit', splitUnit || 'day');
        search.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.getEndpoint(shopID, 'payments')}/geo`, {search})
            .map((res) => res.json());
    }

    public getPaymentRevenueStats(shopID: string, from: Date, to: Date, splitUnit?: string, splitSize?: number): Observable<PaymentRevenueStat[]> {
        const search = new URLSearchParams();
        search.set('fromTime', this.toUTC(from));
        search.set('toTime', this.toUTC(to));
        search.set('splitUnit', splitUnit || 'minute');
        search.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.getEndpoint(shopID, 'payments')}/revenue`, {search})
            .map(res => res.json());
    }

    private getEndpoint(shopID: string, resource: 'customers' | 'payments'): string {
        return `${this.config.capiUrl}/analytics/shops/${shopID}/${resource}/stats`;
    }

    private toUTC(date: Date): string {
        return moment(date).utc().format();
    }

    private getSplitSize(splitSize: number) {
        return splitSize ? toString(splitSize) : '1';
    }
}
