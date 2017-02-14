import * as _ from 'lodash';
import * as moment from 'moment';

export class RevenueDataService {

    public static toLabels(fromTime: string, chartData: any[]) {
        return _.map(chartData, (item: any) => moment(fromTime).add(item.offset, 's').format('DD.MM HH:mm'));
    }

    public static toData(chartData: any[]) {
        return _.map(chartData, (item: any) => _.round(item.profit / 100, 2));
    }
}
