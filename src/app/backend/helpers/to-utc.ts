import moment = require('moment');

export const toUTC = (date: Date): string =>
    moment(date)
        .utc()
        .format();
