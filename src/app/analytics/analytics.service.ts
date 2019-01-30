import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { LocationService } from 'koffing/backend/location.service';
import { AnalyticsService as AnalyticsBackendService } from 'koffing/backend/analytics.service';
import { DoughnutChartData } from './stats-data/doughnut-chart-data';
import { StatsDataConverter } from './stats-data/stats-data.converter';
import { PaymentConversionData } from './stats-data/payment-conversion-data';
import { PaymentRevenueData } from './stats-data/payment-revenue-data';

@Injectable()
export class AnalyticsService {
    constructor(
        private analyticsService: AnalyticsBackendService,
        private locationService: LocationService
    ) {}

    public getPaymentMethodChartData(
        shopID: string,
        from: Date,
        to: Date
    ): Observable<DoughnutChartData> {
        return this.analyticsService
            .getPaymentMethodStats(shopID, from, to)
            .map(paymentMethodStats =>
                StatsDataConverter.toPaymentMethodChartData(paymentMethodStats)
            );
    }

    public getUniqueCount(shopID: string, from: Date, to: Date): Observable<number> {
        return this.analyticsService
            .getPaymentRateStats(shopID, from, to)
            .map(paymentRateStat => (paymentRateStat ? paymentRateStat.uniqueCount : 0));
    }

    public getPaymentConversionData(
        shopID: string,
        from: Date,
        to: Date
    ): Observable<PaymentConversionData> {
        return this.analyticsService
            .getPaymentConversionStats(shopID, from, to)
            .map(paymentConversionStat => {
                const paymentCount = StatsDataConverter.toPaymentCountInfo(paymentConversionStat);
                const conversionChartData = StatsDataConverter.toConversionChartData(
                    from,
                    paymentConversionStat
                );
                return { paymentCount, conversionChartData };
            });
    }

    public getPaymentGeoChartData(
        shopID: string,
        from: Date,
        to: Date
    ): Observable<DoughnutChartData> {
        return Observable.create((observer: Observer<DoughnutChartData>) => {
            this.analyticsService.getPaymentGeoStats(shopID, from, to).subscribe(paymentGeoStat => {
                const data = StatsDataConverter.toGeoChartData(paymentGeoStat);
                this.locationService.getLocationsNames(data.labels).subscribe(locationNames => {
                    data.labels = locationNames.map(locationName => locationName.name);
                    observer.next(data);
                });
            });
        });
    }

    public getPaymentRevenueData(
        shopID: string,
        from: Date,
        to: Date
    ): Observable<PaymentRevenueData> {
        return this.analyticsService
            .getPaymentRevenueStats(shopID, from, to)
            .map(paymentRevenueStat => {
                const profit = StatsDataConverter.toTotalProfit(paymentRevenueStat);
                const revenueChartData = StatsDataConverter.toRevenueChartData(
                    from,
                    paymentRevenueStat
                );
                return { profit, revenueChartData };
            });
    }
}
