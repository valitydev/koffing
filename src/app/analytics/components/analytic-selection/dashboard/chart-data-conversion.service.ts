import * as _ from 'lodash';
import  Dictionary = _.Dictionary;

import { PaymentGeoStat } from 'koffing/backend/classes/geodata.class';
import { LocationName } from 'koffing/backend/classes/location-name.class';
import { GeoChartData } from './geo-chart-data.class';
import { GeoChartLabeled } from './geo-chart-labeled.class';

export class ChartDataConversionService {

    public static toPaymentMethodChartData(paymentMethodStat: any): any {
        return _.map(paymentMethodStat, (item: any) => {
            return {
                totalCount: item.totalCount,
                paymentSystem: item.paymentSystem
            };
        });
    }

    public static toRevenueChartData(revenueStat: any): any {
        return _.map(revenueStat, (item: any) => {
            return {
                profit: item.profit,
                offset: item.offset
            };
        });
    }

    public static toGeoChartData(geoStat: PaymentGeoStat[]): GeoChartData {
        const grouped: Dictionary<PaymentGeoStat[]> = _.groupBy(geoStat, 'geoID');
        const geoIDs: string[] = _.keys(grouped);
        const data: number[] = [];
        _.forEach(geoIDs, geoID => {
            const accumulatedValue = _.reduce(grouped[geoID], (acc: any, item: any) => acc + item.profit, 0);
            data.push(accumulatedValue / 100);
        });

        return new GeoChartData(geoIDs, data);
    }

    public static toLabeledGeoChartData(chartData: GeoChartData, locationNames: LocationName[]): GeoChartLabeled {
        let labels: string[] = [];
        let recordsFound: LocationName[] = [];

        for (let geoID of chartData.geoIDs) {
            recordsFound = _.remove(locationNames, (location) => {
                return String(location.geoID) === String(geoID);
            });

            labels.push(recordsFound.shift().name);
        }

        return new GeoChartLabeled(labels, chartData.data);
    }

    public static toTotalProfit(revenueStat: any): any {
        return _.reduce(revenueStat, (acc: any, item: any) => acc + item.profit, 0);
    }

    public static toPaymentCountInfo(conversionStat: any): any {
        return _.reduce(conversionStat, (acc: any, item: any) => {
            return {
                successfulCount: acc.successfulCount + item.successfulCount,
                unfinishedCount: acc.unfinishedCount + (item.totalCount - item.successfulCount)
            };
        }, {
            successfulCount: 0,
            unfinishedCount: 0
        });
    }

    public static toConversionChartData(conversionStat: any): any {
        return _.map(conversionStat, (item: any) => {
            return {
                conversion: item.conversion,
                offset: item.offset
            };
        });
    }
}
