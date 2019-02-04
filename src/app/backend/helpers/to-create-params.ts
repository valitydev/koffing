import { isDate, reduce } from 'lodash';

export function toCreateParams(params: object): object {
    return reduce(
        params,
        (acc, value, key) => {
            if (value) {
                if (isDate(value)) {
                    return { ...acc, [key]: this.toUTC(value) };
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
