import { LogicError } from '../logic-error';
import { PaymentFlow } from './payment-flow';
import { GeoLocationInfo } from '../geo-location-info';
import { Payer } from '../payer';

export class Payment {
    public id: string;
    public invoiceID: string;
    public shopID: string;
    public createdAt: string;
    public amount: number;
    public currency: string;
    public fee: number;
    public status: string;
    public error: LogicError;
    public flow: PaymentFlow;
    public metadata: object;
    public geoLocationInfo: GeoLocationInfo;
    public payer: Payer;
}
