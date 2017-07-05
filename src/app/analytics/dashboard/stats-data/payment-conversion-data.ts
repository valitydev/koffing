import { PaymentCount } from './payment-count';
import { LineChartData } from './line-chart-data';

export interface PaymentConversionData {
    paymentCount: PaymentCount;
    conversionChartData: LineChartData;
}
