import { round } from 'lodash';

export class CurrencyService {

    public static toMinor(value: number): number {
        return round(value * 100);
    }

    public static toMajor(value: number): number {
        return round(value / 100, 2);
    }
}
