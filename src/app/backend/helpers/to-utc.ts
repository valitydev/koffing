import moment = require('moment');

export function toUTC(date: Date): string {
    return moment(date)
        .utc()
        .format();
}
