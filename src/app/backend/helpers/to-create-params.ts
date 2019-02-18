import { isDate, reduce } from 'lodash';
import { toUTC } from './to-utc';

export function toCreateParams(params: object): object {
    return reduce(
        params,
        (acc, value, key) => {
            if (value) {
                if (isDate(value)) {
                    return { ...acc, [key]: toUTC(value) };
                } else {
                    return { ...acc, [key]: value };
                }
            } else {
                return acc;
            }
        },
        {}
    );
}
