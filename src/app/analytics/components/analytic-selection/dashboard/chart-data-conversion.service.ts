import * as _ from 'lodash';

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

    public static toGeoChartData(geoStat: any): any {
        return _.map(geoStat, (item: any) => {
            return {
                cityName: item.cityName,
                profit: item.profit
            };
        });
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
