import { groupBy, keys, round } from 'lodash';
import * as moment from 'moment';

import { PaymentGeoStat } from 'koffing/backend/model/payment-geo-stat';
import { PaymentMethodStat } from 'koffing/backend/model/payment-method-stat';
import { PaymentConversionStat } from 'koffing/backend/model/payment-conversion-stat';
import { PaymentRevenueStat } from 'koffing/backend/model/payment-revenue-stat';
import { PaymentCount } from './payment-count';
import { LineChartData } from './line-chart-data';
import { Dataset } from './dataset';
import { DoughnutChartData } from './doughnut-chart-data';

export class StatsDataConverter {

    public static toPaymentMethodChartData(stat: PaymentMethodStat[]): DoughnutChartData {
        const group = groupBy(stat, 'paymentSystem');
        const paymentSystems = keys(group);
        const data = paymentSystems.map((system) => group[system].reduce((acc, item) => acc + item.totalCount, 0));
        const labels = paymentSystems.map(system => {
            let result = system;
            if (system === 'visa') {
                result = 'Visa';
            } else if (system === 'mastercard') {
                result = 'Master Card';
            } else if (system === 'nspkmir') {
                result = 'Mir';
            }
            return result;
        });
        return {data, labels};
    }

    public static toGeoChartData(stat: PaymentGeoStat[]): DoughnutChartData {
        const group = groupBy(stat, 'geoID');
        const labels = keys(group);
        const data = labels.map(geoID => group[geoID].reduce((acc, item) => acc + item.profit, 0) / 100);
        return {data, labels};
    }

    public static toRevenueChartData(from: Date, stat: PaymentRevenueStat[]): LineChartData {
        const labels = stat.map((item) => moment(from).add(item.offset, 's').format('DD.MM HH:mm'));
        const datasets: Dataset[] = [{
            label: 'Оборот',
            data: stat.map((item) => round(item.profit / 100, 2))
        }];
        return {labels, datasets};
    }

    public static toConversionChartData(from: Date, stat: PaymentConversionStat[]): LineChartData {
        const labels = stat.map((item) => moment(from).add(item.offset, 's').format('DD.MM HH:mm'));
        const datasets: Dataset[] = [{
            label: 'Конверсия',
            data: stat.map((item) => round(item.conversion * 100, 0))
        }];
        return {labels, datasets};
    }

    public static toTotalProfit(stat: PaymentRevenueStat[]): number {
        return stat.reduce((acc, item) => acc + item.profit, 0);
    }

    public static toPaymentCountInfo(stat: PaymentConversionStat[]): PaymentCount {
        return stat.reduce((acc, item) => {
            return {
                successfulCount: acc.successfulCount + item.successfulCount,
                unfinishedCount: acc.unfinishedCount + (item.totalCount - item.successfulCount)
            };
        }, {successfulCount: 0, unfinishedCount: 0});
    }
}
