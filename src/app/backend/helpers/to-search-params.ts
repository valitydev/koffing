import { URLSearchParams } from '@angular/http';
import { toString, forEach, isNumber, isDate } from 'lodash';

export function toSearchParams(params: object): URLSearchParams {
    const result = new URLSearchParams();
    forEach(params, (value, field) => {
        if (value) {
            if (isDate(value)) {
                result.set(field, this.toUTC(value));
            } else if (isNumber(value)) {
                result.set(field, toString(value));
            } else {
                result.set(field, value);
            }
        }
    });
    return result;
}
