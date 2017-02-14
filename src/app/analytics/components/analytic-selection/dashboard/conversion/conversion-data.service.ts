import * as moment from 'moment';
import * as _ from 'lodash';

export class ConversionDataService {

    public static toLabels(fromTime: string, chartData: any[]) {
        return _.map(chartData, (item: any) => moment(fromTime).add(item.offset, 's').format('DD.MM HH:mm'));
    }

    public static toData(chartData: any[]) {
        return _.map(chartData, (item: any) => _.round(item.conversion * 100, 0));
    }
}
